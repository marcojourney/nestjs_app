import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';
import { TransactionController } from './payroll.controller';
import { BankAccountRepository } from '../bank_account/bank_account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll])],
  controllers: [TransactionController],
  providers: [BankAccountRepository],
})
export class TransactionModule {}
