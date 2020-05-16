'use strict'

const Model = use('Model')
const Env = use('Env')

class Avatar extends Model {
  static get computed() {
    return ['avatarurl']
  }

  getAvatarurl() {
    return `http://10.0.0.107:3333/avatars/${this.file}`
  }

}

module.exports = Avatar
