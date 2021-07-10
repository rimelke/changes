import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateBudgets1625872303754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('budgets', [
      new TableColumn({
        name: 'referenceId',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'referenceType',
        type: 'varchar',
        isNullable: true
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('budgets', [
      new TableColumn({
        name: 'referenceId',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'referenceType',
        type: 'varchar',
        isNullable: true
      })
    ])
  }
}
