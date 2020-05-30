"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterSnackSchema extends Schema {
  up() {
    this.table("snack_bars", (table) => {
      table.string("categories").defaultTo("");
    });
  }

  down() {
    this.clear("snack_bars", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AlterSnackSchema;
