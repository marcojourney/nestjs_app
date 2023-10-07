import { Injectable } from '@nestjs/common';

@Injectable()
export class BankService {
  private accounts: Map<string, number> = new Map();

  // Create a new account with an initial balance
  createAccount(accountNumber: string, initialBalance: number): void {
    this.accounts.set(accountNumber, initialBalance);
  }

  // Get the balance of an account
  getAccountBalance(accountNumber: string): number | undefined {
    return this.accounts.get(accountNumber);
  }

  // Deposit funds into an account
  deposit(accountNumber: string, amount: number): void {
    if (this.accounts.has(accountNumber)) {
      const currentBalance = this.accounts.get(accountNumber);
      const newBalance = currentBalance + amount;
      this.accounts.set(accountNumber, newBalance);
    }
  }

  // Withdraw funds from an account
  withdraw(accountNumber: string, amount: number): void {
    if (this.accounts.has(accountNumber)) {
      const currentBalance = this.accounts.get(accountNumber);
      if (currentBalance >= amount) {
        const newBalance = currentBalance - amount;
        this.accounts.set(accountNumber, newBalance);
      }
    }
  }

  isValidPhoneNumber(phoneNumber) {
    // Define a regular expression pattern for a valid phone number
    const phoneNumberPattern = /^[0-9]{10}$/; // Assumes a 10-digit phone number

    // Test if the phoneNumber matches the pattern
    return phoneNumberPattern.test(phoneNumber);
  }

  getPhoneCardBalance(phoneNumber: string): number {
    const phonesBalance = [
      {
        phoneNumber: '098777444',
        balance: 10,
      },
      {
        phoneNumber: '098777500',
        balance: 10,
      },
    ];

    const foundPhoneBalance = phonesBalance.find(
      (value) => value.phoneNumber == phoneNumber,
    );
    return foundPhoneBalance?.balance;
  }

  setPhoneCardBalance(phoneNumber: string, newBalance: number) {
    const phonesBalance = [
      {
        phoneNumber: '098777444',
        balance: 10,
      },
      {
        phoneNumber: '098777500',
        balance: 10,
      },
    ];

    const foundPhoneNumber = phonesBalance.find(
      (value) => value.phoneNumber == phoneNumber,
    );

    if (foundPhoneNumber) {
      foundPhoneNumber.balance = newBalance;
    }

    return foundPhoneNumber?.balance;
  }

  topUpPhoneCard(phoneNumber: string, amount: number): boolean {
    // Hypothetical logic to top up the phone card
    if (this.isValidPhoneNumber(phoneNumber) && amount > 0) {
      const currentBalance = this.getPhoneCardBalance(phoneNumber);
      this.setPhoneCardBalance(phoneNumber, currentBalance + amount);
      return true;
    } else {
      return false;
    }
  }
}
