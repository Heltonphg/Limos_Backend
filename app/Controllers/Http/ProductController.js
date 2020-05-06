'use strict'

const Product = use('App/Models/Product')

class ProductController {

  async index({ params }) {
    const products = await Product.query()
      .where('snack_bar_id', params.snackbar_id)
      .with('category')
      .fetch()

    return products
  }

  async store({ request, params }) {
    const data = request.all()
    const product = await Product.create({ ...data, snack_bar_id: params.snackbar_id })
    return product
  }

  async show({ params, response }) {
    const { snackbar_id, id } = params
    const product = await Product.query()
      .where('snack_bar_id', snackbar_id)
      .with('category')
      .where('id', id)
      .fetch()
    return product
  }

  async update({ params, request, response }) {
    const data = request.all()
    const product = await Product.findOrFail(params.id)
    if (product.snack_bar_id == params.snackbar_id) {
      product.merge(data)
      await product.save()
      return product
    } else {
      return response.status(401).send("Você não pode editar esse produto.")
    }
  }

  async destroy({ params, response }) {
    const product = await Product.findOrFail(params.id)
    if (product.snack_bar_id == params.snackbar_id) {
      await product.delete()
    } else {
      return response.status(401).send("Você não pode excluir esse produto.")
    }
  }
}


module.exports = ProductController
