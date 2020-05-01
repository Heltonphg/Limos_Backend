'use strict'

const axios = use('axios')
const Address = use('App/Models/Address')

class AddressController {
  async index() {
    const address = await Address.all()
    return address
  }

  async store({ request, auth }) {
    const data = request.only(['zipe_code', 'phone'])

    const response = await axios.get(`https://viacep.com.br/ws/${data.zipe_code}/json/`)
    const { localidade, uf } = response.data
    const address = await Address.create({ ...data, city: localidade, state: uf, user_id: auth.user.id })
    return address
  }

  async show({ params }) {
    const address = await Address.findOrFail(params.id)
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
