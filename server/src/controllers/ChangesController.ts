import { Request, Response } from 'express'
import uploadMiddleware from '../middlewares/uploadMiddleware'
import ChangesService from '../services/ChangesService'

class ChangesController {
  async create(req: Request, res: Response) {
    await uploadMiddleware(req, res)

    const changesService = new ChangesService()

    await changesService.createChange(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const changesService = new ChangesService()

    await changesService.updateChange(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const changesService = new ChangesService()

    await changesService.deleteChange(id)

    res.send()
  }
}

export default ChangesController
