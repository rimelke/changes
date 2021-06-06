import { Router } from 'express'
import ChangesController from './controllers/ChangesController'
import DraftsController from './controllers/DraftsController'
import FabricsController from './controllers/FabricsController'
import GroupsController from './controllers/GroupsController'
import ProductsController from './controllers/ProductsController'
import ProvidersController from './controllers/ProvidersController'

const groupsController = new GroupsController()
const providersController = new ProvidersController()
const fabricsController = new FabricsController()
const productsController = new ProductsController()
const draftsController = new DraftsController()
const changesController = new ChangesController()

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

routes.get('/products', productsController.index)
routes.get('/products/:id', productsController.show)
routes.post('/products', productsController.create)
routes.put('/products/:id', productsController.update)
routes.delete('/products/:id', productsController.delete)

routes.get('/drafts', draftsController.index)
routes.get('/drafts/:id', draftsController.show)
routes.post('/drafts', draftsController.create)
routes.put('/drafts/:id', draftsController.update)
routes.delete('/drafts/:id', draftsController.delete)

routes.post('/changes', changesController.create)
routes.put('/changes/:id', changesController.update)
routes.delete('/changes/:id', changesController.delete)

export default routes
