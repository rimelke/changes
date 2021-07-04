import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import NeedlewomansRepository from '../repositories/NeedlewomansRepository'

interface ICreateNeedlewomanData {
  name: string
}

class NeedlewomansService {
  private needlewomansRepository: NeedlewomansRepository

  constructor() {
    this.needlewomansRepository = getCustomRepository(NeedlewomansRepository)
  }

  getNeedlewomans() {
    return this.needlewomansRepository.find()
  }

  async createNeedlewoman(data: ICreateNeedlewomanData) {
    const schema = Joi.object<ICreateNeedlewomanData>().keys({
      name: Joi.string().required()
    })

    const value: ICreateNeedlewomanData = await schema.validateAsync(data)

    const needlewoman = this.needlewomansRepository.create(value)

    await this.needlewomansRepository.save(needlewoman)
  }
}

export default NeedlewomansService
