'use strict'
const Antl = use('Antl')
class Avatar {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      file: 'required',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Avatar
