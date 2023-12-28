import { MigrationInterface, QueryRunner } from 'typeorm';
import { Column } from './column';

export class BaseMigration implements MigrationInterface {
  protected tableName = 'Student';

  private generateRawSQLFromColumns(): Column[] {
    return [
      {
        name: 'id',
        type: 'int',
        primary: true,
        nullable: true,
        auto: true,
      },
      // {
      //   name: 'name',
      //   type: 'varchar',
      //   length: 255,
      //   nullable: true,
      // },
    ];
  }
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
