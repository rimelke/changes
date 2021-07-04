import { getCustomRepository } from 'typeorm'
import NeedlewomansRepository from '../repositories/NeedlewomansRepository'

class NeedlewomansService {
  private needlewomansRepository: NeedlewomansRepository

  constructor() {
    this.needlewomansRepository = getCustomRepository(NeedlewomansRepository)
  }

  getNeedlewomans() {
    return this.needlewomansRepository.find()
  }
}

export default NeedlewomansService
