'use strict'
const Bag = use('App/Models/Bag')
const Product = use('App/Models/Product')
class BagController {

  async index({ auth }) {
    const user_id = auth.user.id
    const products_bag = await Bag.query()
      .where('user_id', user_id)
      .with('product', (buider) => {
        buider.with('category')
      })
      .with('snack_bar')
      .orderBy('created_at', 'asc')
      .fetch()
    return products_bag
  }

  async store({ request, response, auth }) {
    const data = request.all()
    const product_bag_exist = await Bag.query().where('product_id', data.product_id).first()
    if (product_bag_exist) {
      return response.status(400).send({ error: { message: 'Produto já adicionado' } })
    } else {
      const products_bag = await Bag.query().first();
      if (products_bag && products_bag.snack_bar_id !== data.snack_bar_id) {
        return response.status(400).send({ error: { message: 'Já existe produtos de outra lanchonete na sacola' } })
      } else {
        const user_id = auth.user.id
        const product_bag = await Bag.create({ ...data, user_id })
        return product_bag
      }
    }
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request }) {
    const data = request.all()
    const { id } = params
    const product_bag = await Bag.findOrFail(id)
    product_bag.merge(data)
    await product_bag.save()
    return product_bag
  }

  async destroy({ params, request, response }) {
    const { id } = params
    const product_bag = await Bag.findOrFail(id)
    await product_bag.delete()
  }

}

module.exports = BagController
