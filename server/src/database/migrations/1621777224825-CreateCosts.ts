import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCosts1621777224825 implements MigrationInterface {
  name = 'CreateCosts1621777224825'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "costs" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "name" varchar NOT NULL, "value" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'CREATE TABLE "temporary_costs" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "name" varchar NOT NULL, "value" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "FK_c175fb75e259f3c0a083822c537" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_costs"("id", "productId", "name", "value", "createdAt", "updatedAt") SELECT "id", "productId", "name", "value", "createdAt", "updatedAt" FROM "costs"'
    )
    await queryRunner.query('DROP TABLE "costs"')
    await queryRunner.query('ALTER TABLE "temporary_costs" RENAME TO "costs"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "costs" RENAME TO "temporary_costs"')
    await queryRunner.query(
      'CREATE TABLE "costs" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "name" varchar NOT NULL, "value" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'INSERT INTO "costs"("id", "productId", "name", "value", "createdAt", "updatedAt") SELECT "id", "productId", "name", "value", "createdAt", "updatedAt" FROM "temporary_costs"'
    )
    await queryRunner.query('DROP TABLE "temporary_costs"')
    await queryRunner.query('DROP TABLE "costs"')
  }
}
