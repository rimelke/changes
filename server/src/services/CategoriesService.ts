import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface ICreateCategoryData {
  type: 'INCOME' | 'EXPENSE'
  name: string
}

class CategoriesService {
  private categoriesRepository: CategoriesRepository

  constructor() {
    this.categoriesRepository = getCustomRepository(CategoriesRepository)
  }

  async getCategories() {
    return this.categoriesRepository.find()
  }

  async createCategory(data: ICreateCategoryData) {
    const schema = Joi.object().keys({
      type: Joi.valid('INCOME', 'EXPENSE').required(),
      name: Joi.string().required()
    })

    const value: ICreateCategoryData = await schema.validateAsync(data)

    const category = this.categoriesRepository.create(value)

    await this.categoriesRepository.save(category)
  }

  async updateCategory(id: string, data: { name: string }) {
    const schema = Joi.object()
      .keys({
        name: Joi.string()
      })
      .min(1)

    const value = await schema.validateAsync(data)

    await this.categoriesRepository.update({ id }, value)
  }
}

export default CategoriesService
