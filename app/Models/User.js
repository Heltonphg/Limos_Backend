'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static get hidden() {
    return ['password']
  }
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  addresses() {
    return this.hasMany('App/Models/Address')
  }

  avatar() {
    return this.belongsTo('App/Models/Avatar')
  }

  products_favorite() {
    return this.hasMany('App/Models/Favorite')
  }


}

module.exports = User
