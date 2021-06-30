import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import DraftsRepository from '../repositories/DraftsRepository'
import GroupsRepository from '../repositories/GroupsRepository'

interface IGetDraftsParams {
  type?: string
  groupId?: string
  situation?: string
  search?: string
}

interface ICreateDraftData {
  name: string
  groupId: string
  type?: string | null
}

class DraftsService {
  private draftsRepository: DraftsRepository
  private groupsRepository: GroupsRepository

  constructor() {
    this.draftsRepository = getCustomRepository(DraftsRepository)
    this.groupsRepository = getCustomRepository(GroupsRepository)
  }

  async getDrafts(data: IGetDraftsParams) {
    const schema = Joi.object().keys({
      type: Joi.string(),
      groupId: Joi.string(),
      situation: Joi.string(),
      search: Joi.string().lowercase()
    })

    const {
      type,
      groupId = '%',
      situation = '%',
      search = ''
    }: IGetDraftsParams = await schema.validateAsync(data)

    return this.draftsRepository
      .createQueryBuilder('drafts')
      .innerJoinAndSelect('drafts.group', 'group')
      .where(type ? 'drafts.type = :type' : '1=1', { type })
      .andWhere('drafts.groupId LIKE :groupId', { groupId })
      .andWhere('drafts.situation LIKE :situation', { situation })
      .andWhere('LOWER(drafts.name) LIKE :search', { search: `%${search}%` })
      .orderBy('drafts.updatedAt', 'DESC')
      .limit(30)
      .getMany()
  }

  async getDraft(id: string) {
    return this.draftsRepository
      .createQueryBuilder('drafts')
      .where('drafts.id = :id', { id })
      .innerJoinAndSelect('drafts.group', 'group')
      .leftJoinAndMapMany(
        'drafts.changes',
        'changes',
        'changes',
        'changes.referenceId = drafts.id'
      )
      .addOrderBy('changes.createdAt', 'DESC')
      .getOne()
  }

  async createDraft(data: ICreateDraftData) {
    const schema = Joi.object<ICreateDraftData>().keys({
      groupId: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string()
    })

    const value: ICreateDraftData = await schema.validateAsync(data)

    const groupIsValid = await this.groupsRepository.findOne(value.groupId)

    if (!groupIsValid) throw new AppError('Invalid groupId')

    const nameIsUsed = await this.draftsRepository.findOne({
      where: { name: value.name }
    })

    if (nameIsUsed) throw new AppError('Name already used.')

    const draft = this.draftsRepository.create(value)

    await this.draftsRepository.save(draft)
  }

  async updateDraft(id: string, data: unknown) {
    const schema = Joi.object()
      .keys({
        groupId: Joi.string(),
        name: Joi.string(),
        situation: Joi.string(),
        type: Joi.string()
      })
      .min(1)

    const value = await schema.validateAsync(data)

    await this.draftsRepository.update({ id }, value)
  }

  async deleteDraft(id: string) {
    return this.draftsRepository.delete({ id })
  }
}

export default DraftsService
