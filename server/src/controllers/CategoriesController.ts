import { Request, Response } from 'express'
import CategoriesService from '../services/CategoriesService'

class CategoriesController {
  async index(req: Request, res: Response) {
    const categoriesService = new CategoriesService()

    const categories = await categoriesService.getCategories()

    res.json(categories)
  }

  async create(req: Request, res: Response) {
    const categoriesService = new CategoriesService()

    await categoriesService.createCategory(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const categoriesService = new CategoriesService()

    await categoriesService.updateCategory(id, req.body)

    res.send()
  }
}

export default CategoriesController
