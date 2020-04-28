'use strict'
const User = use('App/Models/User')

class SessionController {
  async store({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      const usr = await User.findByOrFail('email', email)

      if (usr) {
        const token = await auth.attempt(email, password)
        const user = {
          token,
          user_info: usr
        }
        return user
      }
    } catch (error) {
      return response.status(error.status).json({ error: { message: "Impossível Autentiucar-se com as credenciasi fornecidas" } })
    }
  }
}

module.exports = SessionController
