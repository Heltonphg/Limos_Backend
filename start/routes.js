'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sigIn', 'SessionController.sigIn')

