import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import genId from '../utils/genId'

@Entity('needlewomans')
class Needlewoman {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<Needlewoman, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    if (!this.id) {
      this.id = genId()
    }
  }
}

export default Needlewoman
