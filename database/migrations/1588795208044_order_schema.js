'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class OrderSchema extends Schema {
  up () {
    this.create ('orders', table => {
      table.increments ();
      table
        .integer ('user_id')
        .unsigned ()
        .references ('id')
        .inTable ('users')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL')
        .notNullable ();
      table
        .integer ('address_id')
        .unsigned ()
        .references ('id')
        .inTable ('addresses')
        .onUpdate ('CASCADE')
        .onDelete ('SET NULL')
        .notNullable ();
      table
        .integer ('snack_bar_id')
        .unsigned ()
        .references ('id')
        .inTable ('snack_bars')
        .onUpdate ('CASCADE')
        .onDelete ('CASCADE')
        .notNullable ();
      table.float ('valor_total', [8], [2]).defaultTo (0);
      table.string ('status').defaultTo ('Em Análise...');
      table.string ('comment').defaultTo ('');
      table.string ('motivo_negado').defaultTo ('');
      table.boolean ('is_active').defaultTo (true);
      table.timestamps ();
    });
  }

  down () {
    this.drop ('orders');
  }
}

module.exports = OrderSchema;
