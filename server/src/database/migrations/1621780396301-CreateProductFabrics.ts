import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProductFabrics1621780396301 implements MigrationInterface {
  name = 'CreateProductFabrics1621780396301'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" decimal(5,3) NOT NULL, "finalPrice" decimal NOT NULL, "subtotal" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'CREATE TABLE "temporary_productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" decimal(5,3) NOT NULL, "finalPrice" decimal NOT NULL, "subtotal" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "FK_39a093f3e37f286704abe77583a" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_fa627c25763993acbf78d862d5c" FOREIGN KEY ("fabricId") REFERENCES "fabrics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_productFabrics"("id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt") SELECT "id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt" FROM "productFabrics"'
    )
    await queryRunner.query('DROP TABLE "productFabrics"')
    await queryRunner.query(
      'ALTER TABLE "temporary_productFabrics" RENAME TO "productFabrics"'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "productFabrics" RENAME TO "temporary_productFabrics"'
    )
    await queryRunner.query(
      'CREATE TABLE "productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" decimal(5,3) NOT NULL, "finalPrice" decimal NOT NULL, "subtotal" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'INSERT INTO "productFabrics"("id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt") SELECT "id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt" FROM "temporary_productFabrics"'
    )
    await queryRunner.query('DROP TABLE "temporary_productFabrics"')
    await queryRunner.query('DROP TABLE "productFabrics"')
  }
}
