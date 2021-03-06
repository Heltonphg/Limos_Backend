'use strict';

const Order = use ('App/Models/Order');

class OrderController {
  async index({request, auth}) {
    const {user_id} = request.get ();
    let orders = [];
    if (user_id) {
      orders = await Order.query ()
        .where ('user_id', user_id)
        .with ('user')
        .with ('snack_bar')
        .with ('address')
        .with ('orders_items')
        .with ('orders_items.product')
        .fetch ();
    } else {
      orders = await Order.query ()
        .with ('user')
        .where ('snack_bar_id', auth.user.id)
        .with ('snack_bar')
        .with ('orders_items')
        .with ('orders_items.product')
        .with ('address')
        .fetch ();
    }
    return orders;
  }

  async store({request, auth, response}) {
    const {snack_bar_id} = request.headers ();
    const ultima_order = await Order.query ()
      .where ('snack_bar_id', snack_bar_id)
      .where ('is_active', true)
      .first ();
    if (ultima_order) {
      return response
        .status (400)
        .send ({error: {message: 'já existe uma ordem ativa'}});
    }
    const data = request.all ();
    const order = await Order.create ({
      ...data,
      snack_bar_id: snack_bar_id,
      user_id: auth.user.id,
    });
    return order;
  }

  async show({params}) {
    const order = await Order.findOrFail (params.id);
    await order.loadMany (['snack_bar', 'user']);
    return order;
  }

  async update({params, request, response, auth}) {
    try {
      const data = request.all ();
      const order = await Order.findOrFail (params.id);
      if (auth.user.id == order.snack_bar_id) {
        order.merge (data);
        await order.save ();
        return order;
      } else {
        return response
          .status (401)
          .send ('Você não pode alterar esse Pedido.');
      }
    } catch (error) {
      return response
        .status (error.status)
        .send ('Houve algum erro na edição.');
    }
  }

  async destroy({params, response, auth}) {
    const order = await Order.findOrFail (params.id);
    if (order.user_id == auth.user.id && order.status === 'Em Análise...') {
      await order.delete ();
    } else {
      return response.status (401).send ('Você não pode excluir esse Pedido.');
    }
  }
}

module.exports = OrderController;
