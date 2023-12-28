import { User } from "src/modules/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class UserSeeder1694058275383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(User, { roleId: 1, userName: 'marco', password: await bcrypt.hash('123', 10), isAdmin: true });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(User, { where: { userName: 'marco' } });
    }

}
