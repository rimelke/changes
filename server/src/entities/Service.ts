import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  Generated,
  OneToOne
} from 'typeorm'
import genId from '../utils/genId'
import Budget from './Budget'
import Needlewoman from './Needlewoman'
import ServiceProduct from './ServiceProduct'

@Entity('services')
class Service {
  @PrimaryColumn()
  readonly id: string

  @Generated('increment')
  @Column()
  incrementId: number

  @Column()
  needlewomanId: string

  @JoinColumn({ name: 'needlewomanId' })
  @ManyToOne(() => Needlewoman)
  needlewoman: Needlewoman

  @Column()
  value: number

  @Column()
  amount: number

  @Column({ nullable: true, type: 'date' })
  deliveryDate?: string

  @Column({ nullable: true, type: 'date' })
  withdrawalDate?: string

  @Column({ nullable: true })
  duration?: number

  @Column({ default: false })
  isPayed: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => ServiceProduct, (serviceProduct) => serviceProduct.service, {
    cascade: true
  })
  products: ServiceProduct[]

  @Column({ nullable: true })
  budgetId: string

  @JoinColumn({ name: 'budgetId' })
  @OneToOne(() => Budget)
  budget: Budget

  constructor(props: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Service
