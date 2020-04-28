'use strict'

const Model = use('Model')
const Env = use('Env')

class Avatar extends Model {
  static get computed() {
    return ['url']
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/avatars/${id}`
  }




}

module.exports = Avatar
