import { Router } from 'express'
import GroupsController from './controllers/GroupsController'

const groupsController = new GroupsController()

const routes = Router()

routes.get('/groups', groupsController.index)
routes.post('/groups', groupsController.create)
routes.put('/groups/:id', groupsController.update)
routes.delete('/groups/:id', groupsController.delete)

export default routes
