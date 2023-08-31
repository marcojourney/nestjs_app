import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cats1690865705696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE cat (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                breed VARCHAR(255) NOT NULL,
                color VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS cat
        `);
  }
}
