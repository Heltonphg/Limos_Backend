'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bag extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  product() {
    return this.belongsTo('App/Models/Product')
  }
  snack_bar() {
    return this.belongsTo('App/Models/SnackBar')
  }
}

module.exports = Bag
