'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use ('Model');

class PaymentMethod extends Model {
  static get computed () {
    return ['Urlflag'];
  }
  getUrlflag () {
    return `http://10.0.0.107:3333/payment_methods/resized/${this.image_flag}`;
  }

  snack_bars () {
    return this.belongsToMany ('App/Models/SnackBar');
  }
}

module.exports = PaymentMethod;
