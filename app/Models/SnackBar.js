'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SnackBar extends Model {
  products() {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = SnackBar
