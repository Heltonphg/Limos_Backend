'use strict'

const Order = use('App/Models/Order')

class OrderController {

  async index({ request }) {
    const { snack_bar_id } = request.get()
    let orders = []
    if (snack_bar_id) {
      orders = await Order.query()
        .where('snack_bar_id', snack_bar_id)
        .with('user')
        .with('snack_bar')
        .with('orders_items')
        .fetch()
    } else {
      orders = await Order.query()
        .with('user')
        .with('snack_bar')
        .with('orders_items')
        .fetch()
    }
    return orders
  }

  async store({ request, auth }) {
    const { snack_bar_id } = request.headers()
    const data = request.all()
    const order = await Order.create({ ...data, snack_bar_id: snack_bar_id, user_id: auth.user.id })
    return order
  }

  async show({ params }) {
    const order = await Order.findOrFail(params.id)
    await order.loadMany(['snack_bar', 'user'])
    return order
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, response, auth }) {
    const order = await Order.findOrFail(params.id)
    if (order.user_id == auth.user.id) {
      await order.delete()
    } else {
      return response.status(401).send("Você não pode excluir esse Pedido.")
    }
  }

}

module.exports = OrderController
