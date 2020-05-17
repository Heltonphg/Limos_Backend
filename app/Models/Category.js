'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static get computed() {
    return ['categoryimg']
  }

  getCategoryimg() {
    return `http://10.0.0.107:3333/categories/${this.name}.png`
  }
}

module.exports = Category
