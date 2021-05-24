import Joi from 'joi'
import { getCustomRepository, Repository } from 'typeorm'
import Group from '../entities/Group'
import GroupsRepository from '../repositories/GroupsRepository'

interface ICreateGroupData {
  name: string
  desired: number
  minimum: number
}

class GroupsService {
  private groupsRepository: Repository<Group>

  constructor() {
    this.groupsRepository = getCustomRepository(GroupsRepository)
  }

  async getGroups(): Promise<Group[]> {
    return this.groupsRepository.find()
  }

  async createGroup(data: any): Promise<void> {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      minimum: Joi.number().positive().precision(1).required(),
      desired: Joi.number().positive().precision(1).required()
    })

    const { value, error } = schema.validate(data)

    if (error) throw error

    const group = new Group(value)

    await this.groupsRepository.save(group)
  }

  async updateGroup(id: string, data: any) {
    const schema = Joi.object()
      .keys({
        name: Joi.string(),
        minimum: Joi.number().positive().precision(1),
        desired: Joi.number().positive().precision(1)
      })
      .min(1)

    const { value, error } = schema.validate(data)

    if (error) throw error

    await this.groupsRepository.update({ id }, value)
  }

  async deleteGroup(id: string) {
    return this.groupsRepository.delete({ id })
  }
}

export default GroupsService
