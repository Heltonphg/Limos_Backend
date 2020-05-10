'use strict'
const axios = use('axios')
const SnackAddress = use('App/Models/SnackAddress')
const SnackBar = use('App/Models/SnackBar')

class SnackAddressController {

  async index({ request, response, view }) {
    const snackAddress = await SnackAddress.all()
    return snackAddress
  }


  async store({ request }) {
    const { snack_id } = request.headers()

    const data = request.all()

    const response = await axios.get(`https://viacep.com.br/ws/${data.zipe_code}/json/`)
    const { localidade, uf } = response.data
    const snackAddress = await SnackAddress.create({ ...data, city: localidade, state: uf })

    const snack = await SnackBar.findOrFail(snack_id)

    snack.snack_address_id = snackAddress.id
    await snack.save()

    return snackAddress
  }

  async show({ params, request, response, view }) {
  }


  async update({ params, request }) {
    const data = request.all()
    const snack_address = await SnackAddress.findOrFail(params.id)
    snack_address.merge(data)
    await snack_address.save()
    return snack_address
  }


  async destroy({ params, request, response }) {
  }
}

module.exports = SnackAddressController
