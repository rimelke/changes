import { Request, Response } from 'express'
import GroupsService from '../services/GroupsService'

class GroupsController {
  async index(req: Request, res: Response) {
    const groupsService = new GroupsService()

    const groups = await groupsService.getGroups()

    res.json(groups)
  }

  async create(req: Request, res: Response) {
    const groupsService = new GroupsService()

    await groupsService.createGroup(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const groupsService = new GroupsService()

    await groupsService.updateGroup(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const groupsService = new GroupsService()

    await groupsService.deleteGroup(id)

    res.send()
  }
}

export default GroupsController
