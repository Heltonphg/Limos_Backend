'use strict'

const Address = use('App/Models/Address')

class AddressController {
  async index({ request, response }) {
    const address = await Address.query().with('user').fetch()
    return address
  }

  async store({ request, auth }) {
    const data = request.all()
    const address = await Address.create({ ...data, user_id: auth.user.id })
    return address
  }

  async show({ params }) {
    const address = await Address.findOrFail(params.id)
    await address.load('user')
    return address
  }

  async update({ params, request }) {
    const address = await Address.findOrFail(params.id)
    const data = request.all()

    address.merge(data)
    await address.save()

    return address

  }

  async destroy({ params }) {
    const address = await Address.findOrFail(params.id)
    await address.delete()
  }


}

module.exports = AddressController
