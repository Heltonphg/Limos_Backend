'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class OrderItemSchema extends Schema {
  up () {
    this.create ('order_items', table => {
      table.increments ();
      table
        .integer ('product_id')
        .unsigned ()
        .references ('id')
        .inTable ('products')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL')
        .notNullable ();
      table
        .integer ('order_id')
        .unsigned ()
        .references ('id')
        .inTable ('orders')
        .onUpdate ('CASCADE')
        .onDelete ('CASCADE')
        .notNullable ();
      table.float ('discount', [8], [2]).defaultTo (0);
      table.float ('preco', [8], [2]).notNullable ();
      table.integer ('quantity').notNullable ().defaultTo (1);

      table.timestamps ();
    });
  }

  down () {
    this.drop ('order_items');
  }
}

module.exports = OrderItemSchema;
