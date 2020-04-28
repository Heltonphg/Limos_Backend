'use strict'

const Avatar = use('App/Models/Avatar')
const Helpers = use('Helpers')

class AvatarController {
  async show({ params, response }) {
    const { file } = await Avatar.findOrFail(params.id)
    return response.download(Helpers.tmpPath(`uploads/${file}`))
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser();
    try {
      if (!request.file('file')) return
      const upload = request.file('file', { size: '2mb' })
      const fileName = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await Avatar.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        user_id: user.id
      })

      return file
    } catch (error) {
      return response.status(error.status).json(
        { error: { message: 'Erro no upload de arquivo' } }
      )
    }
  }
}

module.exports = AvatarController
