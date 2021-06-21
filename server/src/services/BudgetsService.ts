import Joi from 'joi'
import { getCustomRepository, Like } from 'typeorm'
import AppError from '../errors/AppError'
import BudgetsRepository from '../repositories/BudgetsRepository'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface IGetBudgetsParams {
  take?: number
  skip?: number
  search?: string
  categoryId?: string
}

interface ICreateBudgetData {
  categoryId: string
  description: string
  value: number
  date: Date
}

interface IUpdateBudgetData {
  categoryId?: string
  description?: string
  value?: number
  date?: Date | string
}

class BudgetsService {
  private budgetsRepository: BudgetsRepository
  private categoriesRepository: CategoriesRepository

  constructor() {
    this.budgetsRepository = getCustomRepository(BudgetsRepository)
    this.categoriesRepository = getCustomRepository(CategoriesRepository)
  }

  async getBudgets(params: IGetBudgetsParams) {
    const schema = Joi.object().keys({
      take: Joi.number().positive().integer().max(200),
      skip: Joi.number().integer().min(0),
      search: Joi.string().lowercase(),
      categoryId: Joi.string()
    })

    const {
      search = '',
      skip = 0,
      take = 50,
      categoryId = '%'
    }: IGetBudgetsParams = await schema.validateAsync(params)

    return this.budgetsRepository.find({
      relations: ['category'],
      order: { date: 'DESC' },
      take,
      skip,
      where: { description: Like(`%${search}%`), categoryId: Like(categoryId) }
    })
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

  async updateBudget(id: string, data: IUpdateBudgetData) {
    const schema = Joi.object()
      .keys({
        categoryId: Joi.string(),
        description: Joi.string(),
        value: Joi.number().positive().precision(2),
        date: Joi.date()
      })
      .min(1)

    const value: IUpdateBudgetData = await schema.validateAsync(data)

    if (value.categoryId) {
      const categoryExists = await this.categoriesRepository.findOne(
        value.categoryId
      )

      if (!categoryExists) throw new AppError('Invalid categoryId.')
    }

    if (value.date) {
      value.date = new Date(value.date).toISOString().split('T')[0]
    }

    await this.budgetsRepository.update({ id }, value)
  }

  async deleteBudget(id: string) {
    await this.budgetsRepository.delete({ id })
  }
}

export default BudgetsService
