import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProductFabrics1621780396301 implements MigrationInterface {
  name = 'CreateProductFabrics1621780396301'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" real NOT NULL, "finalPrice" real NOT NULL, "subtotal" real NOT NULL, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)'
    )
    await queryRunner.query(
      'CREATE TABLE "temporary_productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" real NOT NULL, "finalPrice" real NOT NULL, "subtotal" real NOT NULL, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "FK_39a093f3e37f286704abe77583a" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_fa627c25763993acbf78d862d5c" FOREIGN KEY ("fabricId") REFERENCES "fabrics" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)'
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
      'CREATE TABLE "productFabrics" ("id" varchar PRIMARY KEY NOT NULL, "productId" varchar NOT NULL, "fabricId" varchar NOT NULL, "efficiency" real NOT NULL, "finalPrice" real NOT NULL, "subtotal" real NOT NULL, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)'
    )
    await queryRunner.query(
      'INSERT INTO "productFabrics"("id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt") SELECT "id", "productId", "fabricId", "efficiency", "finalPrice", "subtotal", "createdAt", "updatedAt" FROM "temporary_productFabrics"'
    )
    await queryRunner.query('DROP TABLE "temporary_productFabrics"')
    await queryRunner.query('DROP TABLE "productFabrics"')
  }
}
