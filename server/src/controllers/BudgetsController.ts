import { Request, Response } from 'express'
import BudgetsService from '../services/BudgetsService'

class BudgetsController {
  async create(req: Request, res: Response) {
    const budgetsServide = new BudgetsService()

    await budgetsServide.createBudget(req.body)

    res.status(201).json()
  }
}

export default BudgetsController
