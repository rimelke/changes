import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateDrafts1624850860274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'drafts',
      new TableColumn({
        name: 'situation',
        type: 'varchar',
        default: "'Rascunho'"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('drafts', 'situation')
  }
}
