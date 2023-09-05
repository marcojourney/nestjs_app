import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccount } from './entities/bank_account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    private dataSource: DataSource,
  ) {}

  private encyptBankAccount(bankAccount: string) {
    const { publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 3072 });
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        },
        Buffer.from(bankAccount, 'utf-8')
    );
    return encryptedData.toString("base64");
  }

  async createBankAccount(bankAccountDto: CreateBankAccountDto) {
    bankAccountDto.account_number = this.encyptBankAccount(bankAccountDto.account_number);
    const bankAccount = await this.bankAccountRepository.save(bankAccountDto);
    return bankAccount;
  }

  async findAll(): Promise<BankAccount[]> {
    const bankAccounts: BankAccount[] = await this.bankAccountRepository.find();
    return bankAccounts;
  }

  async findOne(id: number): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id },
    });
    return bankAccount;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
