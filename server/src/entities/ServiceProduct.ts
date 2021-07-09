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
import Service from './Service'

@Entity('serviceProducts')
class ServiceProduct {
  @PrimaryColumn()
  readonly id: string

  @Column()
  serviceId: string

  @JoinColumn({ name: 'serviceId' })
  @ManyToOne(() => Service, { orphanedRowAction: 'delete' })
  service: Service

  @Column()
  productId: string

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product)
  product: Product

  @Column()
  amount: number

  @Column()
  unitValue: number

  @Column()
  totalValue: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<ServiceProduct, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default ServiceProduct
