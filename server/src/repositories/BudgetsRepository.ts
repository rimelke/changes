import { EntityRepository, Repository } from 'typeorm'
import Budget from '../entities/Budget'

@EntityRepository(Budget)
class BudgetsRepository extends Repository<Budget> {}

export default BudgetsRepository
