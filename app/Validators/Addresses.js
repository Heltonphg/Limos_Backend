'use strict'

class Addresses {
  get rules() {
    return {
      zipe_code: 'required',
      phone: 'required'
    }
  }
}

module.exports = Addresses
