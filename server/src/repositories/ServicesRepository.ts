import { EntityRepository, Repository } from 'typeorm'
import Service from '../entities/Service'

@EntityRepository(Service)
class ServicesRepository extends Repository<Service> {}

export default ServicesRepository
