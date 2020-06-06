'use strict';
const Antl = use ('Antl');

class SnackBar {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      name: 'required|unique:snack_bars',
      email: 'required|unique:snack_bars',
      password: 'required',
    };
  }

  get messages () {
    return Antl.list ('validation');
  }
}

module.exports = SnackBar;
