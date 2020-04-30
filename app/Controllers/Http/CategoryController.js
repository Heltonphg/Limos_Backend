'use strict'

const Category = use('App/Models/Category')

class CategoryController {

  async index({ request, response, view }) {
    const categories = await Category.all()
    return categories
  }


  async store({ request, response }) {
    const name = request.only(['name'])
    const category = await Category.create(name)
    return category

  }


  async show({ params, request, response, view }) {
  }


  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }

}

module.exports = CategoryController
