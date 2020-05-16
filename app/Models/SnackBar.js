'use strict'
const Env = use('Env')
const Model = use('Model')

class SnackBar extends Model {
  static get computed() {
    return ['logoimg']
  }

  getLogoimg() {
    return `http://10.0.0.107:3333/logos/${this.logo}`
  }

  products() {
    return this.hasMany('App/Models/Product')
  }

  snack_address() {
    return this.belongsTo('App/Models/SnackAddress')
  }
}

module.exports = SnackBar
