'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sigIn', 'SessionController.store')

Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')

Route.group(() => {
  Route.resource('addresses', 'AddressController').apiOnly()
  Route.resource('snackbar', 'SnackBarController').apiOnly()

  Route.get('users/:id', 'UserController.show')
  Route.get('/avatars/:id', 'AvatarController.show')
  Route.post('/avatars', 'AvatarController.store')
}).middleware(['auth'])





