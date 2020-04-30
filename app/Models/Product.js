'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  category() {
    return this.belongsTo('App/Models/Category')
  }
  snack_bar() {
    return this.belongsTo('App/Models/SnackBar')
  }


}

module.exports = Product
