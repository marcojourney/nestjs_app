import { MigrationInterface, QueryRunner } from 'typeorm';

export class Clients1692860670499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Client (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            appId VARCHAR(255),
            appSecret VARCHAR(255),
            origin VARCHAR(255),
            redirectUri VARCHAR(255)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS Client
    `);
  }
}
