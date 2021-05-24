import { Column, Entity, PrimaryColumn } from 'typeorm'
import genId from '../utils/genId'

@Entity('groups')
class Group {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column({ type: 'real', nullable: true })
  profit?: number

  @Column({ type: 'real' })
  desired: number

  @Column({ type: 'real' })
  minimum: number

  constructor(props: Omit<Group, 'id'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Group
