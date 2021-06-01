import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import genId from '../utils/genId'

@Entity('changes')
class Change {
  @PrimaryColumn()
  readonly id: string

  // It can be change of a product or draft, so i used reference instead of productId or changeId
  @Column()
  referenceId: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column()
  filename: string

  @Column()
  url: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<Change, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Change
