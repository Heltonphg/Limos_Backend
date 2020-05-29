'use strict'
const ProductSize = use('App/Models/ProductSize')

class ProductSizeController {

  async index({ params }) {
    const sizes = await ProductSize.query()
      .where('product_id', params.products_id)
      .orderBy('price', 'asc')
      .fetch()

    return sizes;
  }

  async store({ request, response, params }) {
    const { products_id } = params;
    const data = request.all()
    const size = ProductSize.create({ ...data, product_id: products_id })
    return size
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
    const product_size = await ProductSize.findOrFail(params.id)
    product_size.merge(request.all())
    await product_size.save()
    return product_size
  }

  async destroy({ params, request, response }) {
    const { id } = params
    const product_size = await ProductSize.findOrFail(id)
    await product_size.delete()
  }
}

module.exports = ProductSizeController
