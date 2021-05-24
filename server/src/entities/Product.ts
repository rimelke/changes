import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import genId from '../utils/genId'
import Cost from './Cost'
import Group from './Group'

@Entity('products')
class Product {
  @PrimaryColumn()
  readonly id: string

  @Column({ unique: true })
  ref: string

  @JoinColumn({ name: 'groupId' })
  @ManyToOne(() => Group, { onDelete: 'RESTRICT' })
  group: Group

  @Column()
  groupId: string

  @Column()
  name: string

  @Column({ nullable: true, type: 'real' })
  cost?: number

  @Column({ nullable: true, type: 'real' })
  price?: number

  @Column({ nullable: true, type: 'real' })
  profit?: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Cost, (cost) => cost.product)
  costs: Cost[]

  constructor(props: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Product
