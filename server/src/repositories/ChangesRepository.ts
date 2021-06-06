import { EntityRepository, Repository } from 'typeorm'
import Change from '../entities/Change'

@EntityRepository(Change)
class ChangesRepository extends Repository<Change> {}

export default ChangesRepository
