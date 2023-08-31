import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transaction1691546786823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE transaction (
                id INT NOT NULL AUTO_INCREMENT,
                bank_account_id int,
                reference_account_id int,
                transaction_type enum('deposit', 'withdraw', 'transfer'),
                amount INT NOT NULL,
                transaction_date DATETIME NOT NULL,
                PRIMARY KEY (id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS transaction`);
  }
}
