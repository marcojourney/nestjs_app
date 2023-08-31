import { MigrationInterface, QueryRunner } from 'typeorm';

export class Session1691570867598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE session (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                accessToken VARCHAR(255),
                scope JSON,
                userAgent VARCHAR(255),
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS session `);
  }
}
