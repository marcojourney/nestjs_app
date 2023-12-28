import { BaseMigration } from '../base-migration';
import { Column } from '../column';

export class Cats1690865705696 extends BaseMigration {
    protected tableName: string = 'Student';
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
}
