import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateDrafts1624989103561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'drafts',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('drafts', 'type')
  }
}
