import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateNeedlewomans1625407573889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'needlewomans',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('needlewomans')
  }
}
