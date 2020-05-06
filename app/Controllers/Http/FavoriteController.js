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
    const favorite = await Favorite.query()
      .where('user_id', params.user_id)
      .where('id', params.id)
      .with('product')
      .fetch()
    return favorite
  }

  async destroy({ params, response }) {
    const favorite = await Favorite.findOrFail(params.id)
    if (favorite.user_id == params.user_id) {
      await favorite.delete()
    } else {
      return response.status(401).send("Você não pode excluir ess produto.")
    }
  }

}

module.exports = FavoriteController
