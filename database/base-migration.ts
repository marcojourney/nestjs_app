import { MigrationInterface, QueryRunner } from 'typeorm';
import { Column } from './column';
import { Table } from './table';
import { generateRawSQLCreateTable, generateRawSQLDropTable } from './helper';

export class BaseMigration implements MigrationInterface {
  private table: Table;

  protected tableName = 'Student';

  protected columns: Column[] = [
    {
      name: 'id',
      type: 'integer',
      primary: true,
      nullable: true,
      auto: true,
    },
    {
      name: 'name',
      type: 'varchar',
      length: 255,
      nullable: true,
    }
  ];

  constructor() {
    this.table = new Table();
    this.table.name = this.tableName;
    this.table.columns = this.columns;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(generateRawSQLCreateTable(this.table));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(generateRawSQLDropTable(this.table));
  }
}
