'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sigIn', 'SessionController.store')
Route.post('forgot', 'ForgotPasswordController.store')

