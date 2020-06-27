"use strict";

const Schema = use("Schema");

class SnackBarHasPaymentMethodsSchema extends Schema {
  up() {
    this.create("payment_method_snack_bar", (table) => {
      table.increments();
      table
        .integer("snack_bar_id")
        .unsigned()
        .references("id")
        .inTable("snack_bars")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("payment_method_id")
        .unsigned()
        .references("id")
        .inTable("payment_methods")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("payment_method_snack_bar");
  }
}

module.exports = SnackBarHasPaymentMethodsSchema;
