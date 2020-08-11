'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use ('Model');

class PaymentMethod extends Model {
  static get computed () {
    return ['Urlflag'];
  }
  getUrlflag () {
    return `https://adoni.herokuapp.com/payment_methods/resized/${this.image_flag}`;
  }

  snack_bars () {
    return this.belongsToMany ('App/Models/SnackBar');
  }
}

module.exports = PaymentMethod;
