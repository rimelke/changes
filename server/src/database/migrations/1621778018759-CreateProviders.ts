import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProviders1621778018759 implements MigrationInterface {
  name = 'CreateProviders1621778018759'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "providers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "tax" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "providers"')
  }
}
