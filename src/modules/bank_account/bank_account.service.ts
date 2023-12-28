import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccount } from './entities/bank_account.entity';
import { Transaction } from '../transaction/transaction.entity';

@Injectable()
export class BankAccountService {
  
  private algorithm: string = 'aes-256-cbc';

  private initVector: Buffer = crypto.randomBytes(16);

  private securityKey: any = crypto.randomBytes(32);

  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    private dataSource: DataSource,
  ) {}

  private aesEncryption(data: string) {
    const cipher = crypto.createCipheriv(this.algorithm, this.securityKey, this.initVector);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  private aesDecryption(data: string) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.securityKey, this.initVector);

    let decryptedData = decipher.update(data, "hex", "utf-8");

    decryptedData += decipher.final("utf8");

    return decryptedData;
  }

  private encyptBankAccount(bankAccount: string): Buffer {
    const { publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 3072 });
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        },
        Buffer.from(bankAccount, 'utf-8')
    );

    return encryptedData;
  }

  private decryptBankAccount(encryptedBankAccount: Buffer): Buffer {
    const { privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 3072 });
    const bankAccoutNo = crypto.privateDecrypt(
      {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha512",
      },
      encryptedBankAccount
    );
    
    return bankAccoutNo;
  }

  async createBankAccount(bankAccountDto: CreateBankAccountDto) {
    bankAccountDto.account_number = this.encyptBankAccount(bankAccountDto.account_number).toString('base64');
    const bankAccount = await this.bankAccountRepository.save(bankAccountDto);
    return bankAccount;
  }


  async findAll(): Promise<BankAccount[]> {
    const bankAccounts: BankAccount[] = await this.bankAccountRepository
    .find();
    // const records = await this.bankAccountRepository.createQueryBuilder('ba')
    // .innerJoinAndMapMany('ba.transaction', Transaction, 't', 'ba.id = t.bank_account_id')
    // .getMany();
    // console.log('records', records);

    return bankAccounts;
  }

  async findOne(id: number): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.createQueryBuilder('ba')
    .leftJoinAndMapMany('ba.transactions', Transaction, 't', 'ba.id = t.bank_account_id')
    .where('ba.id = :id', { id })
    .getOne();
    this.encyptBankAccount('123456');

    // bankAccount.account_number = this.decryptBankAccount(bankAccount.account_number);

    return bankAccount;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
