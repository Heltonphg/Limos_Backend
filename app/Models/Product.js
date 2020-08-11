'use strict'

const Model = use('Model')
const Env = use('Env')
const URL = require('../../config/general')
class Product extends Model {
  static get computed() {
    return ['img']
  }

  getImg() {
    return `${URL}resized/${this.image}`
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }

  snack_bar() {
    return this.belongsTo('App/Models/SnackBar')
  }

  product_sizes() {
    return this.hasMany('App/Models/ProductSize')
  }


}

module.exports = Product
