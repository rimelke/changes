import IGroup from './IGroup'

interface IDraft {
  id: string
  name: string
  groupId: string
  situation: string
  type: string | null
  createdAt: string
  updatedAt: string
  group: IGroup
}

export default IDraft
