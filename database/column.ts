export class AlterColumn {
  from?: string;
  to?: string;
  action?: 'RENAME' | 'MODIFY';
}

export class Column extends AlterColumn {
  name: string;
  auto?: boolean;
  primary?: boolean;
  type: string;
  length?: number;
  nullable?: boolean;
}
