import { MigrationInterface, QueryRunner } from 'typeorm';

export class BankAccount1691546404259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE bank_account (
                account_number VARCHAR(255) NOT NULL,
                customer_id INT NOT NULL,
                balance INT NOT NULL DEFAULT 0,
                account_type enum('saving', 'payroll', 'checking', 'credit'),
                PRIMARY KEY (account_number)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS bank_account`);
  }
}
