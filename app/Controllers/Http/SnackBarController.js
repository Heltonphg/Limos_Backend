'use strict';
const server = use ('Server');
const io = use ('socket.io') (server.getInstance ());
const SnackBar = use ('App/Models/SnackBar');
const Helpers = use ('Helpers');
const sharp = require ('sharp');
const fs = require ('fs');

class SnackBarController {
  async index({}) {
    const snacks = await SnackBar.query ().orderBy ('id', 'asc').fetch ();
    return snacks;
  }

  async recortar (fileName) {
    await sharp (`${Helpers.publicPath ('logos')}/${fileName}`)
      .resize (700)
      .toFile (`${Helpers.publicPath ('logos')}/resized/${fileName}`)
      .then (data => {
        try {
          fs.unlinkSync (`${Helpers.publicPath ('logos')}/${fileName}`);
        } catch (error) {
          console.log (error);
        }
      })
      .catch (err => console.log (err));
  }

  async store({request, response}) {
    const dir = `${Helpers.publicPath ('logos')}/resized`;
    try {
      const {name, email, password, payments, categories} = request.all ();

      const data = {
        name,
        email,
        password,
      };
      if (!request.file ('logo')) return;
      const upload = request.file ('logo', {size: '5mb'});
      const fileName = `${Date.now ()}.${upload.subtype}`;
      await upload.move (Helpers.publicPath ('logos'), {
        name: fileName,
      });

      if (!upload.moved ()) {
        throw upload.error ();
      }
      if (!fs.existsSync (dir)) {
        fs.mkdirSync (dir);
      }

      await this.recortar (fileName);

      const snack = await SnackBar.create ({...data, logo: fileName});
      if (payments && payments.length > 0) {
        await snack.payment_methods ().attach (payments);
      }
      if (categories && categories.length > 0) {
        await snack.categories ().attach (categories);
        await snack.load ('categories');
      }
      io.emit ('new_snack', snack);
      return snack;
    } catch (error) {
      return response
        .status (error.status)
        .json ({error: {message: 'Erro no cadastro da lanchonete'}});
    }
  }

  async show({params, request, response}) {
    try {
      const snack = await SnackBar.query ()
        .where ('id', params.id)
        .with ('snack_address')
        .with ('payment_methods', builder => {
          builder.orderBy ('created_at', 'desc');
        })
        .with ('categories')
        .first ();
      return snack;
    } catch (error) {
      return response
        .status (error.status)
        .json ({error: {message: 'Lanchonete não existe'}});
    }
  }

  async update({params, request}) {
    const {payments, categories} = request.all ();
    const snack = await SnackBar.findOrFail (params.id);
    const data = request.all ();

    if (request.file ('logo')) {
      const upload = request.file ('logo', {size: '5mb'});
      const fileName = `${Date.now ()}.${upload.subtype}`;
      await upload.move (Helpers.publicPath ('logos'), {
        name: fileName,
      });

      if (!upload.moved ()) {
        throw upload.error ();
      }
      await this.recortar (fileName);
      fs.unlinkSync (`${Helpers.publicPath ('logos')}/resized/${snack.logo}`);
      snack.merge ({...data, logo: fileName});
    } else {
      if (
        (payments && payments.length > 0) ||
        (categories && categories.length > 0)
      ) {
        if (categories && categories.length > 0) {
          await snack.categories ().sync (categories);
        } else if (payments && payments.length > 0) {
          await snack.payment_methods ().sync (payments);
        }
      } else {
        snack.merge (data);
      }
    }

    await snack.save ();

    io.emit ('snack', snack);
    return snack;
  }

  async destroy({params}) {
    const snack = await SnackBar.findOrFail (params.id);
    await snack.delete ();
  }
}

module.exports = SnackBarController;
