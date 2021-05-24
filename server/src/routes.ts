import { Router } from 'express'
import GroupsController from './controllers/GroupsController'
import ProvidersController from './controllers/ProvidersController'

const groupsController = new GroupsController()
const providersController = new ProvidersController()

const routes = Router()

routes.get('/groups', groupsController.index)
routes.post('/groups', groupsController.create)
routes.put('/groups/:id', groupsController.update)
routes.delete('/groups/:id', groupsController.delete)

routes.get('/providers', providersController.index)
routes.post('/providers', providersController.create)
routes.put('/providers/:id', providersController.update)
routes.delete('/providers/:id', providersController.delete)

export default routes
