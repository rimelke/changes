import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import genId from '../utils/genId'
import Product from './Product'

@Entity('costs')
class Cost {
  @PrimaryColumn()
  readonly id: string

  @Column()
  productId: string

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  product: Product

  @Column()
  name: string

  @Column({ type: 'real' })
  value: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<Cost, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Cost
