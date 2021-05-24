import { Router } from 'express'
import FabricsController from './controllers/FabricsController'
import GroupsController from './controllers/GroupsController'
import ProvidersController from './controllers/ProvidersController'

const groupsController = new GroupsController()
const providersController = new ProvidersController()
const fabricsController = new FabricsController()

const routes = Router()

routes.get('/groups', groupsController.index)
routes.post('/groups', groupsController.create)
routes.put('/groups/:id', groupsController.update)
routes.delete('/groups/:id', groupsController.delete)

routes.get('/providers', providersController.index)
routes.post('/providers', providersController.create)
routes.put('/providers/:id', providersController.update)
routes.delete('/providers/:id', providersController.delete)

routes.get('/fabrics', fabricsController.index)
routes.post('/fabrics', fabricsController.create)
routes.put('/fabrics/:id', fabricsController.update)
routes.delete('/fabrics/:id', fabricsController.delete)

export default routes
