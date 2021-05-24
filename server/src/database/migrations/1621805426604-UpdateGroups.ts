import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateGroups1621805426604 implements MigrationInterface {
  name = 'UpdateGroups1621805426604'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "temporary_groups" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "profit" decimal, "desired" decimal NOT NULL, "minimum" decimal NOT NULL)'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_groups"("id", "name", "profit", "desired", "minimum") SELECT "id", "name", "profit", "desired", "minimum" FROM "groups"'
    )
    await queryRunner.query('DROP TABLE "groups"')
    await queryRunner.query('ALTER TABLE "temporary_groups" RENAME TO "groups"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "groups" RENAME TO "temporary_groups"')
    await queryRunner.query(
      'CREATE TABLE "groups" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "profit" decimal, "desired" decimal NOT NULL, "minimum" decimal NOT NULL, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"))'
    )
    await queryRunner.query(
      'INSERT INTO "groups"("id", "name", "profit", "desired", "minimum") SELECT "id", "name", "profit", "desired", "minimum" FROM "temporary_groups"'
    )
    await queryRunner.query('DROP TABLE "temporary_groups"')
  }
}
