import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

export class SessionRepository extends Repository<Session> {
    constructor(
        @InjectRepository(Session)
        private bankAccountRepository: Repository<Session>
    ) {
        super(bankAccountRepository.target, bankAccountRepository.manager, bankAccountRepository.queryRunner);
    }
}