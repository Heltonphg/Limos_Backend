'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use ('Model');
const URL = require('../../config/general')

class PaymentMethod extends Model {
  static get computed () {
    return ['Urlflag'];
  }
  getUrlflag () {
    return `${URL}resized/${this.image_flag}`;
  }

  snack_bars () {
    return this.belongsToMany ('App/Models/SnackBar');
  }
}

module.exports = PaymentMethod;
