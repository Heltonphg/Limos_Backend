'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class DeliveryCitySchema extends Schema {
  up () {
    this.create ('delivery_cities', table => {
      table.increments ();
      table.string ('cep', 45).notNullable ();
      table.string ('city', 144);
      table.string ('state', 10);
      table.float ('price', [8], [2]).notNullable ();
      table
        .integer ('snack_bar_id')
        .unsigned ()
        .references ('id')
        .inTable ('snack_bars')
        .onUpdate ('CASCADE')
        .onDelete ('CASCADE')
        .notNullable ();
      table.timestamps ();
    });
  }

  down () {
    this.drop ('delivery_cities');
  }
}

module.exports = DeliveryCitySchema;
