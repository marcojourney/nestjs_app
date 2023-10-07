import { generateRawSQLCreateTable } from 'database/helper';
import { Table } from 'database/table';

describe('CREATE NEW TABLE', () => {
  it('it should contain table name student', () => {
    const table = new Table();
    table.name = 'Student';
    table.columns = [
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
      },
    ];
    generateRawSQLCreateTable(table);
  });
});
