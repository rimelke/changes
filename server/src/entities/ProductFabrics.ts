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
import Fabric from './Fabric'
import Product from './Product'

@Entity('productFabrics')
class ProductFabrics {
  @PrimaryColumn()
  readonly id: string

  @Column()
  productId: string

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product)
  product: Product

  @Column()
  fabricId: string

  @JoinColumn({ name: 'fabricId' })
  @ManyToOne(() => Fabric)
  fabric: Fabric

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  efficiency: number

  @Column({ type: 'decimal' })
  finalPrice: number

  @Column({ type: 'decimal' })
  subtotal: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<ProductFabrics, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default ProductFabrics
