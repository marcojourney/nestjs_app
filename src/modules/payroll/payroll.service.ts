import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './payroll.entity';
import { BankAccountRepository } from '../bank_account/bank_account.repository';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private transactionRepository: Repository<Payroll>,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}
}
