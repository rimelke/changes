import { EntityRepository, Repository } from 'typeorm'
import Fabric from '../entities/Fabric'

@EntityRepository(Fabric)
class FabricsRepository extends Repository<Fabric> {}

export default FabricsRepository
