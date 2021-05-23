import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateGroups1621775839949 implements MigrationInterface {
  name = 'CreateGroups1621775839949'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "groups" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "profit" decimal, "desired" decimal NOT NULL, "minimum" decimal NOT NULL, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"))'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "groups"')
  }
}
