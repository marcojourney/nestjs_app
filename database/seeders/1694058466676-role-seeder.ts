import { Role } from "src/modules/roles/entities/role.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class RoleSeeder1694058466676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(Role, { name: 'Admin' });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(Role, { where: { name: 'Admin' } });
    }

}
