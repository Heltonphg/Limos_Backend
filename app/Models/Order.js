'use strict'

const Model = use('Model')

class Order extends Model {

  user() {
    return this.belongsTo('App/Models/User')
  }

  snack_bar() {
    return this.belongsTo('App/Models/SnackBar')
  }

  orders_items() {
    return this.hasMany('App/Models/OrderItem')
  }
}

module.exports = Order
