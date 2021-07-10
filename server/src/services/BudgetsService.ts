import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import BudgetsRepository from '../repositories/BudgetsRepository'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface IGetBudgetsParams {
  take?: number
  skip?: number
  search?: string
  categoryId?: string
}

export type BudgetReferenceTypes = 'service'

interface ICreateBudgetData {
  categoryId: string
  description: string
  value: number
  date: string
  referenceId?: string
  referenceType?: BudgetReferenceTypes
}

interface IUpdateBudgetData {
  categoryId?: string
  description?: string
  value?: number
  date?: string
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

    return this.budgetsRepository
      .createQueryBuilder('budgets')
      .innerJoinAndSelect('budgets.category', 'category')
      .take(take)
      .skip(skip)
      .where('LOWER(budgets.description) LIKE :search', {
        search: `%${search}%`
      })
      .andWhere('budgets.categoryId LIKE :categoryId', { categoryId })
      .getMany()
  }

  async createBudget(data: ICreateBudgetData) {
    const schema = Joi.object<ICreateBudgetData>().keys({
      categoryId: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().positive().precision(2).required(),
      date: Joi.date().iso().raw().required(),
      referenceId: Joi.string(),
      referenceType: Joi.when('referenceId', {
        not: null,
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
      })
    })

    const value: ICreateBudgetData = await schema.validateAsync(data)

    const categoryExists = await this.categoriesRepository.findOne(
      value.categoryId
    )

    if (!categoryExists) throw new AppError('Invalid categoryId.')

    const budget = this.budgetsRepository.create(value)

    await this.budgetsRepository.save(budget)

    return budget
  }

  async updateBudget(id: string, data: IUpdateBudgetData) {
    const schema = Joi.object()
      .keys({
        categoryId: Joi.string(),
        description: Joi.string(),
        value: Joi.number().positive().precision(2),
        date: Joi.date().iso().raw()
      })
      .min(1)

    const value: IUpdateBudgetData = await schema.validateAsync(data)

    if (value.categoryId) {
      const categoryExists = await this.categoriesRepository.findOne(
        value.categoryId
      )

      if (!categoryExists) throw new AppError('Invalid categoryId.')
    }

    await this.budgetsRepository.update({ id }, value)
  }

  async deleteBudget(id: string) {
    await this.budgetsRepository.delete({ id })
  }
}

export default BudgetsService
