import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1691718807314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user (
                id INT NOT NULL AUTO_INCREMENT,
                roleId INT,
                userName VARCHAR(255),
                password VARCHAR(255),
                refreshToken VARCHAR(255),
                isAdmin BOOLEAN,
                status ENUM('active','deactive','blocked') DEFAULT 'active',
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
          
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
  }
}
