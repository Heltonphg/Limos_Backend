"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterSnackAddEmailSchema extends Schema {
  up() {
    this.table("snack_bars", (table) => {
      table.string("email", 254);
    });
  }

  down() {
    this.table("snack_bars", (table) => {
      table.string("email", 254);
    });
  }
}

module.exports = AlterSnackAddEmailSchema;
