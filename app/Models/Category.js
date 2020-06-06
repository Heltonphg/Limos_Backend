'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use ('Model');

class Category extends Model {
  static get computed () {
    return ['categoryimg'];
  }

  getCategoryimg () {
    return `http://10.0.0.107:3333/categories/${this.name}.png`;
  }

  snack_bars () {
    return this.belongsToMany ('App/Models/SnackBar');
  }
}

module.exports = Category;
