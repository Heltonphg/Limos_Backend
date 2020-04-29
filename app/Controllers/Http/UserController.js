'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request }) {
    const data = request.all()
    const user = await User.create(data)
    return user
  }

  async show({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)
      await user.load('avatar')
      await user.load('addresses')
      return user
    } catch (error) {
      return response.status(error.status).json(
        { error: { message: "Usuário não encontrado!" } }
      )
    }

  }
}

module.exports = UserController
