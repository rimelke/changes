import { Request, Response } from 'express'
import BudgetsService from '../services/BudgetsService'

class BudgetsController {
  async index(req: Request, res: Response) {
    const budgetsService = new BudgetsService()

    const budgets = await budgetsService.getBudgets(req.query)

    res.json(budgets)
  }

  async create(req: Request, res: Response) {
    const budgetsService = new BudgetsService()

    await budgetsService.createBudget(req.body)

    res.status(201).json()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const budgetsService = new BudgetsService()

    await budgetsService.updateBudget(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const budgetsService = new BudgetsService()

    await budgetsService.deleteBudget(id)

    res.send()
  }
}

export default BudgetsController
