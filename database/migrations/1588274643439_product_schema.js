'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class ProductSchema extends Schema {
  up () {
    this.create ('products', table => {
      table.increments ();
      table.string ('name');
      table.float ('price', [8], [2]);
      table.string ('description');
      table.string ('time_preparation');
      table.string ('acompanhamento').defaultTo ('');
      table.float ('avaliation', [8], [2]).defaultTo (0);
      table.boolean ('is_empty').notNullable ().defaultTo (false);
      table.string ('image');
      table
        .integer ('snack_bar_id')
        .unsigned ()
        .references ('id')
        .inTable ('snack_bars')
        .onUpdate ('CASCADE')
        .onDelete ('CASCADE')
        .notNullable ();

      table
        .integer ('category_id')
        .unsigned ()
        .references ('id')
        .inTable ('categories')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL')
        .notNullable ();
      table.timestamps ();
    });
  }

  down () {
    this.drop ('products');
  }
}

module.exports = ProductSchema;
