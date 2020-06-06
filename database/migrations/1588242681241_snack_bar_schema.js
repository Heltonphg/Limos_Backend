'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use ('Schema');

class SnackBarSchema extends Schema {
  up () {
    this.create ('snack_bars', table => {
      table.increments ();
      table.string ('name').notNullable ().unique ();
      table.string ('email', 254);
      table.string ('password', 60);
      table.boolean ('is_open').defaultTo (false);
      table
        .string ('logo')
        .defaultTo (
          'https://logo.criativoon.com/wp-content/uploads/2016/07/logotipo-lanchonete.png'
        );
      table.string ('min_max_time_delivery');
      table.float ('geral_avaliation', [8], [2]).defaultTo (0);
      table.timestamps ();
    });
  }

  down () {
    this.drop ('snack_bars');
  }
}

module.exports = SnackBarSchema;
