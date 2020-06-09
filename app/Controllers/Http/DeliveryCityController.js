'use strict';
const DeliveryCity = use ('App/Models/DeliveryCity');
const axios = require ('axios');

class DeliveryCityController {
  async index({auth}) {
    const cities_delivery = await DeliveryCity.query ()
      .where ('id', auth.user.id)
      .fetch ();
    return cities_delivery;
  }

  async store({request, auth}) {
    const {cep, price} = request.only (['cep', 'price']);
    let preco = parseFloat (price);
    const response = await axios.get (`https://viacep.com.br/ws/${cep}/json/`);
    const {localidade, uf} = response.data;
    const city_delivery = await DeliveryCity.create ({
      cep,
      city: localidade,
      state: uf,
      price: preco,
      snack_bar_id: auth.user.id,
    });
    return city_delivery;
  }

  async show({params, request, response, view}) {}

  async update({params, request, response, auth}) {
    const data = request.all ();
    const {id} = params;
    const city_delivery = await DeliveryCity.findOrFail (id);
    if (city_delivery.snack_bar_id !== auth.user.id) {
      return response
        .status (401)
        .send ({error: {message: 'você não pode altera isso!'}});
    }
    city_delivery.merge (data);
    await city_delivery.save ();
    return city_delivery;
  }

  async destroy({params, request, response}) {}
}

module.exports = DeliveryCityController;
