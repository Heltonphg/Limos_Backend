'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class CategorySnackBarSchema extends Schema {
  up () {
    this.create ('category_snack_bar', table => {
      table.increments ();
      table
        .integer ('snack_bar_id')
        .unsigned ()
        .references ('id')
        .inTable ('snack_bars')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL');
      table
        .integer ('category_id')
        .unsigned ()
        .references ('id')
        .inTable ('categories')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL');
      table.timestamps ();
    });
  }

  down () {
    this.drop ('category_snack_bar');
  }
}

module.exports = CategorySnackBarSchema;
