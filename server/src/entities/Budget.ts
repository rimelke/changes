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
import Category from './Category'

@Entity('budgets')
class Budget {
  @PrimaryColumn()
  readonly id: string

  @Column()
  categoryId: string

  @Column()
  description: string

  @Column({ type: 'real' })
  value: number

  @Column({ type: 'date' })
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  category: Category

  constructor(props: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props)
    this.id = genId()
  }
}

export default Budget
