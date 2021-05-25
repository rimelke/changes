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
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  product: Product

  @Column()
  fabricId: string

  @JoinColumn({ name: 'fabricId' })
  @ManyToOne(() => Fabric, { onDelete: 'RESTRICT' })
  fabric: Fabric

  @Column({ type: 'real' })
  efficiency: number

  @Column({ type: 'real' })
  finalPrice: number

  @Column({ type: 'real' })
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
