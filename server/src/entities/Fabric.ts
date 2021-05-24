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
import Provider from './Provider'

@Entity('fabrics')
class Fabric {
  @PrimaryColumn()
  readonly id: string

  @Column()
  providerId: string

  @JoinColumn({ name: 'providerId' })
  @ManyToOne(() => Provider, { onDelete: 'RESTRICT' })
  provider: Provider

  @Column()
  name: string

  @Column()
  grammage: number

  @Column({ type: 'real' })
  width: number

  @Column({ type: 'real' })
  price: number

  @Column({ type: 'real' })
  finalPrice: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(props: Omit<Provider, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Fabric
