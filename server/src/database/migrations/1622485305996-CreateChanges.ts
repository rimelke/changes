import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateChanges1622485305996 implements MigrationInterface {
  name = 'CreateChanges1622485305996'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "changes" ("id" varchar PRIMARY KEY NOT NULL, "referenceId" varchar NOT NULL, "description" text, "filename" varchar NOT NULL, "url" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "changes"')
  }
}
