'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sigIn', 'SessionController.store')

Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')

