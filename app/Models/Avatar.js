'use strict'

const Model = use('Model')
const Env = use('Env')

class Avatar extends Model {
  static get computed() {
    return ['avatarurl']
  }

  getAvatarurl() {
    return `https://adoni.herokuapp.com/avatars/${this.file}`
  }

}

module.exports = Avatar
