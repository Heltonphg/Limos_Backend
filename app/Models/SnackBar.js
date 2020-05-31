"use strict";
const Model = use("Model");
const Hash = use("Hash");

class SnackBar extends Model {
  static get computed() {
    return ["logoimg"];
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async (snackbarInstance) => {
      if (snackbarInstance.dirty.password) {
        snackbarInstance.password = await Hash.make(snackbarInstance.password);
      }
    });

    
  }

  getLogoimg() {
    return `http://10.0.0.107:3333/logos/${this.logo}`;
  }

  products() {
    return this.hasMany("App/Models/Product");
  }

  snack_address() {
    return this.belongsTo("App/Models/SnackAddress");
  }
}

module.exports = SnackBar;
