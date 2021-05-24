import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateProducts1621863482172 implements MigrationInterface {
  name = 'UpdateProducts1621863482172'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "ref" varchar NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "cost" decimal, "price" decimal, "profit" decimal, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_a6707c046e2faf75f9e6efb715c" UNIQUE ("ref"))'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_products"("id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt") SELECT "id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt" FROM "products"'
    )
    await queryRunner.query('DROP TABLE "products"')
    await queryRunner.query(
      'ALTER TABLE "temporary_products" RENAME TO "products"'
    )
    await queryRunner.query(
      'CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "ref" varchar NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "cost" decimal, "price" decimal, "profit" decimal, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_a6707c046e2faf75f9e6efb715c" UNIQUE ("ref"), CONSTRAINT "FK_8f1611225215b15b7784b2e266d" FOREIGN KEY ("groupId") REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_products"("id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt") SELECT "id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt" FROM "products"'
    )
    await queryRunner.query('DROP TABLE "products"')
    await queryRunner.query(
      'ALTER TABLE "temporary_products" RENAME TO "products"'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "products" RENAME TO "temporary_products"'
    )
    await queryRunner.query(
      'CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "ref" varchar NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "cost" decimal, "price" decimal, "profit" decimal, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_a6707c046e2faf75f9e6efb715c" UNIQUE ("ref"))'
    )
    await queryRunner.query(
      'INSERT INTO "products"("id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt") SELECT "id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt" FROM "temporary_products"'
    )
    await queryRunner.query('DROP TABLE "temporary_products"')
    await queryRunner.query(
      'ALTER TABLE "products" RENAME TO "temporary_products"'
    )
    await queryRunner.query(
      'CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "ref" varchar NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "cost" decimal, "price" decimal, "profit" decimal, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_a6707c046e2faf75f9e6efb715c" UNIQUE ("ref"), CONSTRAINT "FK_8f1611225215b15b7784b2e266d" FOREIGN KEY ("groupId") REFERENCES "groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    )
    await queryRunner.query(
      'INSERT INTO "products"("id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt") SELECT "id", "ref", "groupId", "name", "cost", "price", "profit", "createdAt", "updatedAt" FROM "temporary_products"'
    )
    await queryRunner.query('DROP TABLE "temporary_products"')
  }
}
