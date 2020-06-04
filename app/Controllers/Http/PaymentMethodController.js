'use strict';
const PaymentMethod = use ('App/Models/PaymentMethod');
const Helpers = use ('Helpers');
const sharp = require ('sharp');
const fs = require ('fs');

class PaymentMethodController {
  async index({request, response, view}) {
    const payments = await PaymentMethod.query ().fetch ();
    return payments;
  }
  async recortar (fileName) {
    await sharp (`${Helpers.publicPath ('payment_methods')}/${fileName}`)
      .resize (500)
      .jpeg ({quality: 70})
      .toFile (`${Helpers.publicPath ('payment_methods')}/resized/${fileName}`)
      .then (data => {
        try {
          fs.unlinkSync (
            `${Helpers.publicPath ('payment_methods')}/${fileName}`
          );
        } catch (error) {
          console.log (error);
        }
      })
      .catch (err => console.log (err));
  }

  async store({request, response}) {
    const dir = `${Helpers.publicPath ('payment_methods')}/resized`;
    try {
      const data = request.all ();

      let fileName = '';
      if (request.file ('image_flag')) {
        const upload = request.file ('image_flag', {size: '5mb'});
        fileName = `${Date.now ()}.${upload.subtype}`;
        await upload.move (Helpers.publicPath ('payment_methods'), {
          name: fileName,
        });

        if (!fs.existsSync (dir)) {
          fs.mkdirSync (dir);
        }
        await this.recortar (fileName);
        if (!upload.moved ()) {
          const error = upload.error ();
          return response.status (401).send ({error: {message: error}});
        }
      }

      const payemnt = await PaymentMethod.create ({
        ...data,
        image_flag: fileName,
      });

      return payemnt;
    } catch (error) {
      return response.status (error.status).json ({
        error: {message: 'Erro no cadastro do método de pagamento'},
      });
    }
  }

  async show({params, request, response, view}) {}

  async update({params, request, response}) {
    const data = await request.all ();
    const {id} = params;
    const payment = await PaymentMethod.findOrFail (id);
    if (request.file ('image_flag')) {
      const upload = request.file ('image_flag', {size: '5mb'});
      const fileName = `${Date.now ()}.${upload.subtype}`;
      await upload.move (Helpers.publicPath ('payment_methods'), {
        name: fileName,
      });

      if (!upload.moved ()) {
        throw upload.error ();
      }

      await this.recortar (fileName);
      fs.unlinkSync (
        `${Helpers.publicPath ('payment_methods')}/resized/${payment.image_flag}`
      );
      payment.merge ({...data, image_flag: fileName});
    } else {
      payment.merge (data);
    }
    await payment.save ();
    return payment;
  }

  async destroy({params, request, response}) {
    const {id} = params;
    const payment = await PaymentMethod.findOrFail (id);
    await payment.delete ();
  }
}

module.exports = PaymentMethodController;
