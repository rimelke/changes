import { Request, Response } from 'express'
import DraftsService from '../services/DraftsService'

class DraftsController {
  async index(req: Request, res: Response) {
    const draftsService = new DraftsService()

    const drafts = await draftsService.getDrafts(req.query)

    res.json(drafts)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const draftsService = new DraftsService()

    const draft = await draftsService.getDraft(id)

    res.json(draft)
  }

  async create(req: Request, res: Response) {
    const draftsService = new DraftsService()

    await draftsService.createDraft(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const draftsService = new DraftsService()

    await draftsService.updateDraft(id, req.body)

    res.send()
  }

  async promote(req: Request, res: Response) {
    const { id } = req.params

    const draftsService = new DraftsService()

    await draftsService.promoteDraft(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const draftsService = new DraftsService()

    await draftsService.deleteDraft(id)

    res.send()
  }
}

export default DraftsController
