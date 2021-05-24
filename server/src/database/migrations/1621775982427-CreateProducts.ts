import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProducts1621775982427 implements MigrationInterface {
  name = 'CreateProducts1621775982427'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "ref" varchar NOT NULL, "groupId" varchar NOT NULL, "name" varchar NOT NULL, "cost" real, "price" real, "profit" real, "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_a6707c046e2faf75f9e6efb715c" UNIQUE ("ref"), CONSTRAINT "FK_8f1611225215b15b7784b2e266d" FOREIGN KEY ("groupId") REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "products"')
  }
}
