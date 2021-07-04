import { EntityRepository, Repository } from 'typeorm'
import Needlewoman from '../entities/Needlewoman'

@EntityRepository(Needlewoman)
class NeedlewomansRepository extends Repository<Needlewoman> {}

export default NeedlewomansRepository
