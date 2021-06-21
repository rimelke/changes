import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import BudgetsRepository from '../repositories/BudgetsRepository'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface ICreateBudgetData {
  categoryId: string
  description: string
  value: number
  date: Date
}

class BudgetsService {
  private budgetsRepository: BudgetsRepository
  private categoriesRepository: CategoriesRepository

  constructor() {
    this.budgetsRepository = getCustomRepository(BudgetsRepository)
    this.categoriesRepository = getCustomRepository(CategoriesRepository)
  }

  async createBudget(data: ICreateBudgetData) {
    const schema = Joi.object().keys({
      categoryId: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().positive().precision(2).required(),
      date: Joi.date().required()
    })

    const value: ICreateBudgetData = await schema.validateAsync(data)

    const categoryExists = await this.categoriesRepository.findOne(
      value.categoryId
    )

    if (!categoryExists) throw new AppError('Invalid categoryId.')

    const budget = this.budgetsRepository.create({
      ...value,
      date: value.date.toISOString().split('T')[0]
    })

    await this.budgetsRepository.save(budget)
  }
}

export default BudgetsService
