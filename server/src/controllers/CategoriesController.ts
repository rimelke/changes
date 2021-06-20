import { Request, Response } from 'express'
import CategoriesService from '../services/CategoriesService'

class CategoriesController {
  async index(req: Request, res: Response) {
    const categoriesService = new CategoriesService()

    const categories = await categoriesService.getCategories()

    res.json(categories)
  }
}

export default CategoriesController
