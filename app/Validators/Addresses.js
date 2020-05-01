'use strict'
const Antl = use('Antl')

class Addresses {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      zipe_code: 'required',
      phone: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Addresses
