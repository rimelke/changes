import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProviders1621778018759 implements MigrationInterface {
  name = 'CreateProviders1621778018759'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "providers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "tax" real NOT NULL, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "providers"')
  }
}
