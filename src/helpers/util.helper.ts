import { BankAccount } from 'src/types/bank.account';
import * as fs from 'fs';
import * as crypto from 'crypto';
const CryptoJS = require('crypto-js');

const secret_key = 'this_is_a_secret_key';
const your_secret_iv = 'this_is_an_iv';

export class Util {
  private static instance: Util;

  private constructor() {}

  public static getInstance(): Util {
    if (!Util.instance) {
      Util.instance = new Util();
    }

    return Util.instance;
  }

  public getTotalOrder(productPrice: number, quantity: number): number {
    if (productPrice <= 0 || quantity <= 0) {
      throw new Error('Invalid product price or quantity.');
    }

    return productPrice * quantity;
  }

  public depositAmountToBankAccount(
    bankAccount: BankAccount,
    amount: number,
  ): number {
    if (amount <= 0) {
      throw new Error('Invalid amount.');
    }

    bankAccount.balance += amount;

    return bankAccount.balance;
  }

  public createBankAccountNumber(lastAccountNo: string): string {
    const NUMBER_OF_DIGIT = 9;

    const nextAccountNo = (Number(lastAccountNo) + 1).toString();

    return nextAccountNo.padStart(NUMBER_OF_DIGIT, '0');
  }

  public updateBalanceAfterDeposit(
    currentBalance: number,
    deposit: number,
  ): number {
    return currentBalance + Math.max(deposit, 0);
  }

  public updateBalanceAfterWithdraw(
    currentBalance: number,
    withdraw: number,
  ): number {
    if (withdraw > currentBalance) {
      throw Error(
        'The withdraw amount cannot be greater than the current balance.',
      );
    }
    return currentBalance - Math.abs(withdraw);
  }

  public updateBalanceAfterTransferOut(
    currentBalance: number,
    transfer: number,
  ): number {
    if (transfer < 0) {
      throw Error('The transfer amount cannot be smaller than zero.');
    }

    return currentBalance - transfer;
  }

  public updateBalanceAfterReceiveTransfer(
    currentBalance: number,
    transfer: number,
  ): number {
    if (transfer < 0) {
      throw Error('The transfer amount cannot be smaller than zero.');
    }
    return currentBalance + transfer;
  }

  public rsaEncrypt(value: string) {
    const { publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 3072,
    });

    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
      },
      Buffer.from(value, 'utf-8'),
    );

    return encryptedData.toString();
  }

  public rsaDecrypt(value: string) {
    const { privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 3072,
    });

    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
      },
      Buffer.from(value, 'utf-8'),
    );

    return decryptedData.toString();
  }

  public aesEncrypt(content: string) {
    const parsedkey = CryptoJS.enc.Utf8.parse(secret_key);
    const iv = CryptoJS.enc.Utf8.parse(your_secret_iv);
    const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  public aesDecrypt(word: string) {
    const keys = CryptoJS.enc.Utf8.parse(secret_key);
    const base64 = CryptoJS.enc.Base64.parse(word);
    const src = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(src, keys, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  }

  public helloWorld() {
    console.log('Hello World');
  }
}
