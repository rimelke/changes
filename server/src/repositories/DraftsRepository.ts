import { EntityRepository, Repository } from 'typeorm'
import Draft from '../entities/Draft'

@EntityRepository(Draft)
class DraftsRepository extends Repository<Draft> {}

export default DraftsRepository
