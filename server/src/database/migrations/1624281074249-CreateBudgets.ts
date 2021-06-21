import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBudgets1624281074249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'budgets',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'categoryId',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'value',
            type: 'real'
          },
          {
            name: 'date',
            type: 'date'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          }
        ],
        foreignKeys: [
          {
            name: 'FKCategory',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categoryId'],
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('budgets')
  }
}
