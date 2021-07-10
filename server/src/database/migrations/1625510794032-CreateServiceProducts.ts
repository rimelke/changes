import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateServiceProducts1625510794032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'serviceProducts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'serviceId',
            type: 'varchar'
          },
          {
            name: 'productId',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'integer'
          },
          {
            name: 'unitValue',
            type: 'real'
          },
          {
            name: 'totalValue',
            type: 'real'
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
        ],
        foreignKeys: [
          {
            name: 'FKService',
            referencedTableName: 'services',
            referencedColumnNames: ['id'],
            columnNames: ['serviceId']
          },
          {
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['productId']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('serviceProducts')
  }
}
