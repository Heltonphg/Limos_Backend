'use strict'

const Model = use('Model')
const Env = use('Env')
const URL = require('../../config/general')

class Avatar extends Model {
  static get computed() {
    return ['avatarurl']
  }

  getAvatarurl() {
    return `${URL}avatars/${this.file}`
  }

}

module.exports = Avatar
