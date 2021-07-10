import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export class UpdateServices1625872519908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'services',
      new TableColumn({
        name: 'budgetId',
        type: 'varchar',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'FKBudget',
        referencedTableName: 'budgets',
        columnNames: ['budgetId'],
        referencedColumnNames: ['id']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services', 'FKBudget')

    await queryRunner.dropColumn('services', 'budgetId')
  }
}
