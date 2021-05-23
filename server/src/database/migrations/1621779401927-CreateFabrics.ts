import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFabrics1621779401927 implements MigrationInterface {
  name = 'CreateFabrics1621779401927'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "fabrics" ("id" varchar PRIMARY KEY NOT NULL, "providerId" varchar NOT NULL, "name" varchar NOT NULL, "grammage" integer NOT NULL, "width" decimal NOT NULL, "price" decimal NOT NULL, "finalPrice" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'CREATE TABLE "temporary_fabrics" ("id" varchar PRIMARY KEY NOT NULL, "providerId" varchar NOT NULL, "name" varchar NOT NULL, "grammage" integer NOT NULL, "width" decimal NOT NULL, "price" decimal NOT NULL, "finalPrice" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "FK_c2b95da4a7b7f6a3336da3f27de" FOREIGN KEY ("providerId") REFERENCES "providers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    )
    await queryRunner.query(
      'INSERT INTO "temporary_fabrics"("id", "providerId", "name", "grammage", "width", "price", "finalPrice", "createdAt", "updatedAt") SELECT "id", "providerId", "name", "grammage", "width", "price", "finalPrice", "createdAt", "updatedAt" FROM "fabrics"'
    )
    await queryRunner.query('DROP TABLE "fabrics"')
    await queryRunner.query(
      'ALTER TABLE "temporary_fabrics" RENAME TO "fabrics"'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "fabrics" RENAME TO "temporary_fabrics"'
    )
    await queryRunner.query(
      'CREATE TABLE "fabrics" ("id" varchar PRIMARY KEY NOT NULL, "providerId" varchar NOT NULL, "name" varchar NOT NULL, "grammage" integer NOT NULL, "width" decimal NOT NULL, "price" decimal NOT NULL, "finalPrice" decimal NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')))'
    )
    await queryRunner.query(
      'INSERT INTO "fabrics"("id", "providerId", "name", "grammage", "width", "price", "finalPrice", "createdAt", "updatedAt") SELECT "id", "providerId", "name", "grammage", "width", "price", "finalPrice", "createdAt", "updatedAt" FROM "temporary_fabrics"'
    )
    await queryRunner.query('DROP TABLE "temporary_fabrics"')
    await queryRunner.query('DROP TABLE "fabrics"')
  }
}
