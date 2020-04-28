'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.get('users/:id', 'UserController.show')

Route.post('sigIn', 'SessionController.store')

Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')

Route.get('/avatars/:id', 'AvatarController.show')
Route.post('/avatars', 'AvatarController.store')

