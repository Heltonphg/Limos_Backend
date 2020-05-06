'use strict'

const Model = use('Model')
const Env = use('Env')

class Product extends Model {
  static get computed() {
    return ['img']
  }

  getImg() {
    return `${Env.get('APP_URL')}/product/${this.id}`
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }
  snack_bar() {
    return this.belongsTo('App/Models/SnackBar')
  }


}

module.exports = Product
