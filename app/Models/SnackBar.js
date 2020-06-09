'use strict';
const Model = use ('Model');
const Hash = use ('Hash');

class SnackBar extends Model {
  static get computed () {
    return ['logoimg'];
  }

  static boot () {
    super.boot ();

    this.addHook ('beforeSave', async snackbarInstance => {
      if (snackbarInstance.dirty.password) {
        snackbarInstance.password = await Hash.make (snackbarInstance.password);
      }
    });
  }

  getLogoimg () {
    return `http://10.0.0.107:3333/logos/resized/${this.logo}`;
  }

  payment_methods () {
    return this.belongsToMany ('App/Models/PaymentMethod');
  }

  categories () {
    return this.belongsToMany ('App/Models/Category');
  }

  products () {
    return this.hasMany ('App/Models/Product');
  }

  delivery_cities () {
    return this.hasMany ('App/Models/DeliveryCity');
  }

  snack_address () {
    return this.belongsTo ('App/Models/SnackAddress');
  }
}

module.exports = SnackBar;
