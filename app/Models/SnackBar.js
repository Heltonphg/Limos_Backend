'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SnackBar extends Model {
  products() {
    return this.hasMany('App/Models/Product')
  }

  snack_address() {
    return this.belongsTo('App/Models/SnackAddress')
  }
}

module.exports = SnackBar
