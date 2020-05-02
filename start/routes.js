'use strict'

const Route = use('Route')

Route.get('/', ({ response }) => {
  return response.send('Olá mundo!')
})

Route.post('users', 'UserController.store').validator('User')

Route.post('sigIn', 'SessionController.store')

Route.post('forgot', 'ForgotPasswordController.store').validator('ResetPass')
Route.put('forgot', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.resource('addresses', 'AddressController').apiOnly().validator(new Map([[['addresses.store'], ['Addresses']]]))
  Route.resource('snackbar', 'SnackBarController').apiOnly()
  Route.resource('category', 'CategoryController').apiOnly().validator(new Map([[['category.store'], ['Category']]]))
  Route.resource('snackbar.products', 'ProductController').apiOnly()

  Route.get('users/:id', 'UserController.show')
  Route.get('/avatars/:id', 'AvatarController.show')
  Route.post('/avatars', 'AvatarController.store').validator('Avatar')
}).middleware(['auth'])





