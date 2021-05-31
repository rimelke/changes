import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import genId from '../utils/genId'

@Entity('drafts')
class Draft {
  @PrimaryColumn()
  readonly id: string

  @Column()
  groupId: string

  @Column({ unique: true })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<Draft, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Draft
