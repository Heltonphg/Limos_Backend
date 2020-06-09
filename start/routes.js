'use strict';
const Drive = use ('Drive');
const Route = use ('Route');

//TODO: ROTA RAIZ
Route.get ('/', ({response}) => {
  return response.send ('Olá mundo!');
});

//TODO: CADASTRO DA LANCHONETE
Route.post ('snackbar', 'SnackBarController.store');

//TODO: CADASTRO DO USER
Route.post ('users', 'UserController.store').validator ('User');

//TODO: Autenticações
Route.post ('sigIn', 'SessionController.store');
Route.post ('sigIn_Snack', 'SessionController.singInSnack');

//TODO: Esqueci a senha user
Route.post ('forgot', 'ForgotPasswordController.store').validator ('ResetPass');
Route.put ('forgot', 'ForgotPasswordController.update').validator (
  'ResetPassword'
);

Route.group (() => {
  Route.resource ('addresses', 'AddressController')
    .apiOnly ()
    .validator (new Map ([[['addresses.store'], ['Addresses']]]));

  Route.resource ('snackbar_user', 'SnackBarController').only ([
    'index',
    'show',
  ]);

  Route.resource ('category', 'CategoryController').only (['index']);

  //TODO: rota para buscas os produtos para o app
  Route.resource ('snackbar.products', 'ProductController').only (['index']);

  Route.resource ('products_bag', 'BagController').apiOnly ();

  Route.resource ('user.favorite', 'FavoriteController').apiOnly ();

  Route.resource ('order_items', 'OrderItemController').only ([
    'index',
    'store',
  ]);

  Route.resource ('order_client', 'OrderController').except (['update']);

  Route.get ('users/:id', 'UserController.show');
  Route.post ('/avatars', 'AvatarController.store').validator ('Avatar');
}).middleware (['auth']);

//Rotas para lanchonetes
Route.group (() => {
  Route.resource ('snack_address', 'SnackAddressController')
    .apiOnly ()
    .validator (new Map ([[['addresses.store'], ['Addresses']]]));

  Route.resource ('snackbar', 'SnackBarController')
    .apiOnly ()
    .validator (new Map ([[['snackbar.store'], ['SnackBar']]]));

  Route.resource ('category_snack', 'CategoryController')
    .apiOnly ()
    .validator (new Map ([[['category.store'], ['Category']]]));

  Route.resource ('products', 'ProductController')
    .apiOnly ()
    .validator (new Map ([[['snackbar.products.store'], ['Product']]]));

  Route.resource ('order_snack', 'OrderController').only ([
    'show',
    'index',
    'update',
  ]);

  Route.resource ('payment_methods', 'PaymentMethodController').apiOnly ();

  Route.resource ('delivery_cities', 'DeliveryCityController').apiOnly ();

  Route.resource ('products.sizes', 'ProductSizeController').apiOnly ();
}).middleware (['auth:anotherAuth']);
