import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateServices1625498753510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'incrementId',
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'needlewomanId',
            type: 'varchar'
          },
          {
            name: 'value',
            type: 'real'
          },
          {
            name: 'amount',
            type: 'integer'
          },
          {
            name: 'deliveryDate',
            type: 'date',
            isNullable: true
          },
          {
            name: 'withdrawalDate',
            type: 'date',
            isNullable: true
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'isPayed',
            type: 'boolean',
            default: false
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
            name: 'FKNeedlewoman',
            referencedTableName: 'needlewomans',
            referencedColumnNames: ['id'],
            columnNames: ['needlewomanId']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('needlewomans')
  }
}
