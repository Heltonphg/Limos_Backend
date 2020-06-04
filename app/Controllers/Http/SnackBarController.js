'use strict';
const server = use ('Server');
const io = use ('socket.io') (server.getInstance ());
const SnackBar = use ('App/Models/SnackBar');
const Helpers = use ('Helpers');

class SnackBarController {
  async index({}) {
    const snacks = await SnackBar.query ().orderBy ('id', 'asc').fetch ();
    return snacks;
  }

  async store({request, response}) {
    try {
      const {name, categories, email, password, payments} = request.all ();
      const data = {
        name,
        categories,
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

      const snack = await SnackBar.create ({...data, logo: fileName});
      if (payments && payments.length > 0) {
        snack
          .payment_methods ()
          .attach (payments)
          .then (succes => {})
          .catch (e => console.log (e));
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
      const snack = await SnackBar.findOrFail (params.id);
      await snack.loadMany (['snack_address', 'payment_methods']);
      return snack;
    } catch (error) {
      return response
        .status (error.status)
        .json ({error: {message: 'Lanchonete não existe'}});
    }
  }

  async update({params, request}) {
    const {payments} = request.all ();
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
      snack.merge ({...data, logo: fileName});
    } else {
      if (payments && payments.length > 0) {
        await snack.payment_methods ().sync (payments);
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
