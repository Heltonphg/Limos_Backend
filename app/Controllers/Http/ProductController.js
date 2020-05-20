'use strict'

const Product = use('App/Models/Product')
const Helpers = use('Helpers')
const Env = use('Env')

class ProductController {

  async index({ params, request }) {
    const { category_id } = request.get()
    let products = []
    if (category_id) {
      products = await Product.query()
        .where('snack_bar_id', params.snackbar_id)
        .where('category_id', category_id)
        .orderBy('avaliation', 'desc')
        .with('category')
        .fetch()
    } else {
      products = await Product.query()
        .where('snack_bar_id', params.snackbar_id)
        .orderBy('avaliation', 'desc')
        .with('category')
        .fetch()
    }
    return products
  }


  async store({ request, params, response }) {
    try {
      const data = request.all()
      let fileName = ''
      if (request.file('image')) {
        const upload = request.file('image', { size: '2mb' })
        fileName = `${Date.now()}.${upload.subtype}`
        await upload.move(Helpers.publicPath('images_products'), {
          name: fileName
        })
        if (!upload.moved()) {
          throw upload.error()
        }
      }

      const product = await Product.create({ ...data, snack_bar_id: params.snackbar_id, 'image': fileName })

      return product
    } catch (error) {
      return response.status(error.status).json(
        { error: { message: 'Erro no cadastro de produto' } }
      )
    }
  }

  async show({ params }) {
    const { snackbar_id, id } = params
    const product = await Product.query()
      .where('snack_bar_id', snackbar_id)
      .with('category')
      .where('id', id)
      .fetch()
    return product
  }

  async update({ params, request, response }) {
    const product = await Product.findOrFail(params.id)
    const data = request.all()

    if (product.snack_bar_id == params.snackbar_id) {
      if (request.file('image')) {
        const upload = request.file('image', { size: '2mb' })
        const fileName = `${Date.now()}.${upload.subtype}`
        await upload.move(Helpers.publicPath('images_products'), {
          name: fileName
        })

        if (!upload.moved()) {
          throw upload.error()
        }

        product.merge({ ...data, 'image': fileName })
      } else {
        product.merge(data)
      }
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
