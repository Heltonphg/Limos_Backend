'use strict'

const Address = use('App/Models/Address')

class AddressController {
  async index({ request, response }) {
    const address = await Address.all()
    return address
  }

  async store({ request, response, auth }) {
    const data = request.all()
    const address = await Address.create({ ...data, user_id: auth.user.id })
    return address
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = AddressController
