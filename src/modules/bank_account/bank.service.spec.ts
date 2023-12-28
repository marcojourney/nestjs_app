import { Test, TestingModule } from '@nestjs/testing';
import { BankService } from './bank.service';
import { expect } from 'chai';

describe('BankService', () => {
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankService],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(service).to.be.instanceOf(BankService);
  });

  describe('createAccount', () => {
    it('should create a new account with an initial balance', () => {
      // Arrange
      const accountNumber = '123456';
      const initialBalance = 1000;

      // Act
      service.createAccount(accountNumber, initialBalance);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.equal(initialBalance);
    });
  });

  describe('deposit', () => {
    it('should deposit funds into an account', () => {
      // Arrange
      const accountNumber = '123456';
      const initialBalance = 1000;
      const depositAmount = 500;
      service.createAccount(accountNumber, initialBalance);

      // Act
      service.deposit(accountNumber, depositAmount);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.equal(
        initialBalance + depositAmount,
      );
    });

    it('should not deposit funds into a non-existent account', () => {
      // Arrange
      const accountNumber = 'non_existent';
      const depositAmount = 500;

      // Act
      service.deposit(accountNumber, depositAmount);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.be.undefined;
    });
  });

  describe('withdraw', () => {
    it('should withdraw funds from an account', () => {
      // Arrange
      const accountNumber = '123456';
      const initialBalance = 1000;
      const withdrawalAmount = 500;
      service.createAccount(accountNumber, initialBalance);

      // Act
      service.withdraw(accountNumber, withdrawalAmount);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.equal(
        initialBalance - withdrawalAmount,
      );
    });

    it('should not withdraw funds from a non-existent account', () => {
      // Arrange
      const accountNumber = 'non_existent';
      const withdrawalAmount = 500;

      // Act
      service.withdraw(accountNumber, withdrawalAmount);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.be.undefined;
    });

    it('should not withdraw more funds than the account balance', () => {
      // Arrange
      const accountNumber = '123456';
      const initialBalance = 1000;
      const withdrawalAmount = 1500;
      service.createAccount(accountNumber, initialBalance);

      // Act
      service.withdraw(accountNumber, withdrawalAmount);

      // Assert
      expect(service.getAccountBalance(accountNumber)).to.equal(initialBalance);
    });
  });

  describe('phone top-up', () => {
    it('should top-up phone number card successfully', () => {
      // Arrange
      const phoneNumber = '1234567890';
      const amount = 30;

      // Act
      service.topUpPhoneCard(phoneNumber, amount);

      // Assert
      expect(service.getPhoneCardBalance(phoneNumber));
    });
  });
});
