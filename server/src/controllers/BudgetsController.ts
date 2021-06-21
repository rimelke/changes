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
}

export default BudgetsController
