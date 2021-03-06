import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import genId from '../utils/genId'
import Group from './Group'

@Entity('drafts')
class Draft {
  @PrimaryColumn()
  readonly id: string

  @Column()
  groupId: string

  @JoinColumn({ name: 'groupId' })
  @ManyToOne(() => Group)
  group: Group

  @Column({ unique: true })
  name: string

  @Column({ default: 'Rascunho' })
  situation: string

  @Column({ nullable: true })
  type: string | null

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
