'use strict'
const Favorite = use('App/Models/Favorite')

class FavoriteController {

  async index({ params }) {
    const favorites = await Favorite.query()
      .where('user_id', params.user_id)
      .with('product')
      .fetch()
    return favorites
  }

  async store({ request, auth }) {
    const { product_id } = request.only(['product_id'])
    const favorite = await Favorite.create({ product_id, user_id: auth.user.id })
    return favorite
  }


  async show({ params, request }) {
  }


  async update({ params, request, response }) {
  }


  async destroy({ params, request, response }) {
  }

}

module.exports = FavoriteController
