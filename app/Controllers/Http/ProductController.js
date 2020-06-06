'use strict';

const Product = use ('App/Models/Product');
const Category = use ('App/Models/Category');

const Helpers = use ('Helpers');
const sharp = require ('sharp');
const fs = require ('fs');

class ProductController {
  async index({params, request, auth}) {
    const {category_id} = request.get ();
    let products = [];
    if (category_id) {
      products = await Product.query ()
        .where (
          'snack_bar_id',
          params.snackbar_id ? params.snackbar_id : auth.user.id
        )
        .where ('category_id', category_id)
        .orderBy ('avaliation', 'desc')
        .with ('category')
        .with ('product_sizes', builder => {
          builder.orderBy ('price', 'asc');
        })
        .fetch ();
    } else {
      products = await Product.query ()
        .where (
          'snack_bar_id',
          params.snackbar_id ? params.snackbar_id : auth.user.id
        )
        .orderBy ('avaliation', 'desc')
        .with ('category')
        .with ('product_sizes', builder => {
          builder.orderBy ('price', 'asc');
        })
        .fetch ();
    }

    return products;
  }

  async recortar (fileName) {
    await sharp (`${Helpers.publicPath ('images_products')}/${fileName}`)
      .resize (520)
      .jpeg ({quality: 70})
      .toFile (`${Helpers.publicPath ('images_products')}/resized/${fileName}`)
      .then (data => {
        try {
          fs.unlinkSync (
            `${Helpers.publicPath ('images_products')}/${fileName}`
          );
        } catch (error) {
          console.log (error);
        }
      });
  }

  //refatorar
  async store({request, auth, response}) {
    const dir = `${Helpers.publicPath ('images_products')}/resized`;
    try {
      const data = request.all ();
      const cat_exist = await Category.find (data.category_id);
      if (!cat_exist) {
        return response
          .status (401)
          .send ({message: {error: 'Categoria informada não existe!'}});
      }

      let fileName = '';
      if (request.file ('image')) {
        const upload = request.file ('image', {size: '2mb'});
        fileName = `${Date.now ()}.${upload.subtype}`;
        await upload.move (Helpers.publicPath ('images_products'), {
          name: fileName,
        });

        if (!upload.moved ()) {
          const error = upload.error ();
          return response.status (401).send ({error: {message: error}});
        }

        if (!fs.existsSync (dir)) {
          fs.mkdirSync (dir);
        }

        await this.recortar (fileName);
      }

      const product = await Product.create ({
        ...data,
        snack_bar_id: auth.user.id,
        image: fileName,
        description: data.description.trim (),
      });

      return product;
    } catch (error) {
      return response
        .status (error.status)
        .json ({error: {message: 'Erro no cadastro de produto'}});
    }
  }

  async show({params, auth}) {
    const {id} = params;
    const product = await Product.query ()
      .where ('snack_bar_id', auth.user.id)
      .with ('category')
      .with ('product_sizes', builder => {
        builder.orderBy ('price', 'asc');
      })
      .where ('id', id)
      .fetch ();
    return product;
  }

  async update({auth, request, response, params}) {
    const product = await Product.findOrFail (params.id);
    const data = request.all ();

    if (product.snack_bar_id == auth.user.id) {
      if (request.file ('image')) {
        const upload = request.file ('image', {size: '2mb'});
        const fileName = `${Date.now ()}.${upload.subtype}`;
        await upload.move (Helpers.publicPath ('images_products'), {
          name: fileName,
        });

        if (!upload.moved ()) {
          throw upload.error ();
        }

        await this.recortar (fileName);

        fs.unlinkSync (
          `${Helpers.publicPath ('images_products')}/resized/${product.image}`
        );

        product.merge ({...data, image: fileName});
      } else {
        product.merge (data);
      }
      await product.save ();
      return product;
    } else {
      return response
        .status (401)
        .send ({error: {message: 'Você não pode editar esse produto.'}});
    }
  }

  async destroy({params, auth, response}) {
    const product = await Product.findOrFail (params.id);
    if (product.snack_bar_id == auth.user.id) {
      await product.delete ();
    } else {
      return response
        .status (401)
        .send ({error: {message: 'Você não pode excluir esse produto.'}});
    }
  }
}

module.exports = ProductController;
