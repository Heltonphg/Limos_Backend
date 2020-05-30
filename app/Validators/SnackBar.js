"use strict";
const Antl = use("Antl");

class SnackBar {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required|unique:snack_bars",
      payment: "required",
      categories: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = SnackBar;
