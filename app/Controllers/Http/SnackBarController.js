'use strict'
const server = use('Server')
const io = use('socket.io')(server.getInstance())
const SnackBar = use('App/Models/SnackBar')

class SnackBarController {

  async index({ }) {
    const snacks = await SnackBar.query().orderBy('id', 'asc').fetch()
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
      await snack.loadMany(['products', 'snack_address', 'products.category'])
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

    io.emit('snack', snack);
    return snack

  }

  async destroy({ params }) {
    const snack = await SnackBar.findOrFail(params.id)
    await snack.delete()
  }
}

module.exports = SnackBarController
