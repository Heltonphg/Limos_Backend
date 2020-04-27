'use strict'
const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(5).toString('hex')
      user.token_created_at = new Date()
      user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token },
        message => {
          message
            .to(user.email)
            .from('w@gmail.com', 'Helton Wylammi')
            .subject('Recuperação de Senha')
        }
      )

    } catch (error) {
      return response.status(error.status).json({ error: { message: "Usuário não encontrado" } })
    }

  }

  async update({ request, response }) {
    try {
      const { password, token } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('1', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).json({
          error: {
            message: "O token expirou, gere um token novamente!"
          }
        })
      }

      user.token = null;
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (error) {
      return response.status(error.status).json({
        error: {
          message: "Algo deu errado ao resetar a senha!"
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
