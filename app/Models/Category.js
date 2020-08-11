'use strict';

const Model = use ('Model');
const URL = require('../../config/general')

class Category extends Model {
  static get computed () {
    return ['categoryimg'];
  }

  getCategoryimg () {
    return `${URL}categories/${this.name}.png`;
  }

  snack_bars () {
    return this.belongsToMany ('App/Models/SnackBar');
  }
}

module.exports = Category;
