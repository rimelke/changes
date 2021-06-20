import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../repositories/CategoriesRepository'

class CategoriesService {
  private categoriesRepository: CategoriesRepository

  constructor() {
    this.categoriesRepository = getCustomRepository(CategoriesRepository)
  }

  async getCategories() {
    return this.categoriesRepository.find()
  }
}

export default CategoriesService
