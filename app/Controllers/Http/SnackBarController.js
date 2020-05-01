'use strict'

const SnackBar = use('App/Models/SnackBar')

class SnackBarController {

  async index({ }) {
    const snacks = await SnackBar.all()
    return snacks
  }

  async store({ request }) {
    const data = request.all()
    const snack = await SnackBar.create(data)
    return snack
  }

  async show({ params, request, response }) {
    try {
      const snack = await SnackBar.findOrFail(params.id)
      await snack.loadMany(['products', 'products.category'])
      return snack
    } catch (error) {
      return response.status(error.status).json({ error: { message: "Lanchonete não existe" } })
    }
  }

  async update({ params, request }) {
    const snack = await SnackBar.findOrFail(params.id)
    const data = request.all()

    snack.merge(data)
    await snack.save()

    return snack
  }

  async destroy({ params }) {
    const snack = await SnackBar.findOrFail(params.id)
    await snack.delete()
  }
}

module.exports = SnackBarController
