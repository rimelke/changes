import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateGroups1621775839949 implements MigrationInterface {
  name = 'CreateGroups1621775839949'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "groups" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "profit" real, "desired" real NOT NULL, "minimum" real NOT NULL)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "groups"')
  }
}
