import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank_account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    private dataSource: DataSource,
  ) {}

  // async createBankAccount(bankAccountDto: CreateBankAccountDto) {
  //   let bankAccount: CreateBankAccountDto;
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   const manager: EntityManager = queryRunner.manager;

  //   try {
  //     const encryptedBankAccNo: string = Util.getInstance().rsaEncrypt(bankAccountDto.account_number);
  //     console.log("DDDDD:", encryptedBankAccNo);
  //     bankAccount = await manager.save(bankAccountDto);
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }

  //   return bankAccount;
  // }

  async createBankAccount(bankAccountDto: CreateBankAccountDto) {
    const bankAccount = await this.bankAccountRepository.save(bankAccountDto);
    return bankAccount;
  }

  async findAll(): Promise<BankAccount[]> {
    const bankAccounts: BankAccount[] = await this.bankAccountRepository.find();
    return bankAccounts;
  }

  async findOne(id: number): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.findOne({where: {id}});
    return bankAccount;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
