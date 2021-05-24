import { EntityRepository, Repository } from 'typeorm'
import Provider from '../entities/Provider'

@EntityRepository(Provider)
class ProvidersRepository extends Repository<Provider> {}

export default ProvidersRepository
