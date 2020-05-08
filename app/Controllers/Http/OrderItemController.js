'use strict'

const OrderItem = use('App/Models/OrderItem')
const Order = use('App/Models/Order')

class OrderItemController {

  async index({ request }) {
    const { order_id } = request.headers()
    const orders = await OrderItem.query()
      .where('order_id', order_id)
      .fetch()
    return orders
  }

  async store({ request, response, auth }) {
    const data = await request.all();

    const order = await Order.query()
      .where('is_active', true)
      .where('user_id', auth.user.id)
      .first()
    if (order) {
      const arr_produts = Object.keys(data).map(e => {
        return ({ ...data[e], order_id: order.id })
      })

      arr_produts.forEach(element => {
        OrderItem.create(element)
      });

      order.is_active = false
      await order.save()
      return response.status(200).send()

    }

  }


  async show({ params, request, response, view }) {
  }


  async update({ params, request, response }) {
  }


  async destroy({ params, request, response }) {
  }
}

module.exports = OrderItemController
