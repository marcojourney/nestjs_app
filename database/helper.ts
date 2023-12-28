import { Column } from './column';
import dataTypes from './data-types';
import { Table } from './table';

export function generateRawSQLCreateTable(table: Table) {
  const rawSQLCreate = `CREATE TABLE ${table.name} (
   ${mapColumns(table.columns)}
  )`;
  return rawSQLCreate;
}

export function generateRawSQLDropTable(table: Table) {
  const rawSQLDrop = `DROP TABLE IF EXISTS ${table.name}`;
  return rawSQLDrop;
}

export function generateRawSQLAlterTable(table: Table) {
  let rawSQLAlter = `ALTER TABLE ${table.name}`;
  rawSQLAlter = table.columns
    .map((column) => {
      let actionSQL = '';
      if (column.action == 'MODIFY') {
        actionSQL = `MODIFY COLUMN ${getColumn(column)}`;
      } else if (column.action == 'RENAME') {
        actionSQL = `RENAME COLUMN ${column.from} ${getColumn(column)}`;
      }

      return actionSQL;
    })
    .join(',');
  return rawSQLAlter;
}

export function mapColumns(columns: Column[]) {
  return columns.map((column) => {
    let columnStr = getColumn(column);

    // Check if columnn is primary key
    if (column.primary) {
      columnStr = `${columnStr},${getPrimaryColumn(column)}`;
    }

    return columnStr;
  });
}

export function getPrimaryColumn(column: Column) {
  return `PRIMARY KEY (${column.name})`;
}

export function getType(column: Column) {
  return `${dataTypes[column.type]}(255)`;
}

export function getColumn(column: Column) {
  let columnStr = `${column.name} ${getType(column)}`;

  if (!column.nullable) {
    columnStr += ' NOT NULL';
  }

  return columnStr;
}

export function generateTypeORMClass(collection: any[]): string {
  const className = 'Role';
  let classDefinition = `import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';\n\n`;
  classDefinition += `@Entity()\n`;
  classDefinition += `export class ${className} {\n`;

  for (const field of collection) {
    const { name, type, length, primary, nullable, auto } = field;
    let columnDecorator = `  @Column({ type: '${type}'`;
    if (length) {
      columnDecorator += `, length: ${length}`;
    }
    if (primary) {
      columnDecorator += `, primary: true`;
    }
    if (nullable) {
      columnDecorator += `, nullable: true`;
    }
    if (auto) {
      columnDecorator += `, generated: 'increment'`;
    }
    columnDecorator += ` })\n`;

    classDefinition += columnDecorator;
    classDefinition += `  ${name}: ${getTypeScriptType(type)};\n\n`;
  }

  classDefinition += `}\n`;

  return classDefinition;
}

function getTypeScriptType(sqlType: string): string {
  switch (sqlType) {
    case 'integer':
      return 'number';
    case 'varchar':
      return 'string';
    // Add more data type mappings as needed
    default:
      return 'any';
  }
}

function generateTimestamp(): number {
  const timestamp = new Date().getTime();
  return timestamp;
}
