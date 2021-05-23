import { Column, Entity, PrimaryColumn } from 'typeorm'
import genId from '../utils/genId'

@Entity('groups')
class Group {
  @PrimaryColumn()
  readonly id: string

  @Column({ unique: true })
  name: string

  @Column({ type: 'decimal', nullable: true })
  profit: number

  @Column({ type: 'decimal' })
  desired: number

  @Column({ type: 'decimal' })
  minimum: number

  constructor(props: Omit<Group, 'id'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Group
