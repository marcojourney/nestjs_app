import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BankAccount } from './entities/bank_account.entity';
import { HttpCode } from 'src/https_code';
import { BankAccountStatus } from 'src/enums/bank_account_status.enum';

export class BankAccountRepository extends Repository<BankAccount> {
    constructor(
        @InjectRepository(BankAccount)
        private bankAccountRepository: Repository<BankAccount>
    ) {
        super(bankAccountRepository.target, bankAccountRepository.manager, bankAccountRepository.queryRunner);
    }

    async getBankAccountById(bankAccountId: number) {
        const bankAccount = await this.bankAccountRepository.findOne({where: {id: bankAccountId}});

        if (bankAccount == null) {
            throw new NotFoundException('Bank account is not found out system', HttpCode.NOT_FOUND);
        }

        if (bankAccount.status == BankAccountStatus.DEACTIVE) {
            throw new BadRequestException('Bank account is now deacative', HttpCode.DEACTIVE);
        }

        if (bankAccount.status == BankAccountStatus.BLOCKED) {
            throw new BadRequestException('Bank account is now blocked', HttpCode.BLOCKED)
        }

        return bankAccount;
    }
}