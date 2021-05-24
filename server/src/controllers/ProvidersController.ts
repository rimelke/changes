import { Request, Response } from 'express'
import ProvidersService from '../services/ProvidersService'

class ProvidersController {
  async index(req: Request, res: Response) {
    const providersService = new ProvidersService()

    const providers = await providersService.getProviders()

    res.json(providers)
  }

  async create(req: Request, res: Response) {
    const providersService = new ProvidersService()

    await providersService.createProvider(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const providersService = new ProvidersService()

    await providersService.updateProvider(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const providersService = new ProvidersService()

    await providersService.deleteProvider(id)

    res.send()
  }
}

export default ProvidersController
