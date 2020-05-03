'use strict'

const Antl = use('Antl')

class Product {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required',
      preco: 'required',
      description: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Product
