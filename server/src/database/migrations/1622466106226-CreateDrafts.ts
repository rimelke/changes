import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDrafts1622466106226 implements MigrationInterface {
  name = 'CreateDrafts1622466106226'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "drafts" ("id" varchar PRIMARY KEY NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_f31ed68b142762b294164422b70" UNIQUE ("name"))'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "drafts"')
  }
}
