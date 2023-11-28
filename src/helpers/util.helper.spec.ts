import { Util } from './util.helper';

describe('Calculate total order product', () => {
  it('Should return the correct total price for a valid product price and quantity', () => {
    const productPrice = 100;
    const quantity = 5;
    const expectedTotalPrice = 500;

    const actualTotalPrice = Util.getInstance().getTotalOrder(
      productPrice,
      quantity,
    );

    expect(actualTotalPrice).toBe(expectedTotalPrice);
  });

  it('Should throw an error for an invalid product price', () => {
    const productPrice = -100;
    const quantity = 5;

    try {
      Util.getInstance().getTotalOrder(productPrice, quantity);
    } catch (error) {
      expect(error.message).toBe('Invalid product price or quantity.');
    }
  });

  it('Should throw an error for an invalid quantity', () => {
    const productPrice = 100;
    const quantity = -5;

    try {
      Util.getInstance().getTotalOrder(productPrice, quantity);
    } catch (error) {
      expect(error.message).toBe('Invalid product price or quantity.');
    }
  });
});

describe('Deposit amount to bank account', () => {
  it('Should return the correct balance after a successful deposit', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    const balance = Util.getInstance().depositAmountToBankAccount(
      bankAccount,
      50,
    );

    expect(balance).toBe(150);
  });

  it('Should throw an error for an invalid account number', () => {
    const bankAccount = {
      accountNumber: 'Invalid_account_number',
      balance: 100,
    };

    try {
      Util.getInstance().depositAmountToBankAccount(bankAccount, 50);
    } catch (error) {
      expect(error.message).toBe('Invalid account number.');
    }
  });

  it('Should throw an error for an invalid amount', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    try {
      Util.getInstance().depositAmountToBankAccount(bankAccount, -50);
    } catch (error) {
      expect(error.message).toBe('Invalid amount.');
    }
  });

  it('Should return the initial balance if the amount is 0', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    try {
      Util.getInstance().depositAmountToBankAccount(bankAccount, 0);
    } catch (error) {
      expect(error.message).toBe('Invalid amount.');
    }
  });
});

describe('Create bank account number', () => {
  it('Give last bank account no: 000000000, should return number: 000000001', () => {
    const bankAccountNumber =
      Util.getInstance().createBankAccountNumber('000000000');
    expect(bankAccountNumber).toBe('000000001');
  });

  it('Give last bank account no: 000000001, should return number: 000000002', () => {
    const bankAccountNumber =
      Util.getInstance().createBankAccountNumber('000000001');
    expect(bankAccountNumber).toBe('000000002');
  });
});

describe('Update balance by deposit', () => {
  it('should return the correct balance when the deposit is positive', () => {
    const currentBalance = 100;
    const deposit = 50;
    const expectedBalance = 150;
    const actualBalance = Util.getInstance().updateBalanceAfterDeposit(
      currentBalance,
      deposit,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should return the original balance when the deposit is zero', () => {
    const currentBalance = 100;
    const deposit = 0;
    const expectedBalance = 100;
    const actualBalance = Util.getInstance().updateBalanceAfterDeposit(
      currentBalance,
      deposit,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should return the original balance when the deposit is negative', () => {
    const currentBalance = 100;
    const deposit = -50;
    const expectedBalance = 100;
    const actualBalance = Util.getInstance().updateBalanceAfterDeposit(
      currentBalance,
      deposit,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should throw an error when the current balance is negative and the deposit is positive', () => {
    const currentBalance = -10;
    const deposit = 50;
    const expectedBalance = 40;
    const actualBalance = Util.getInstance().updateBalanceAfterDeposit(
      currentBalance,
      deposit,
    );
    expect(actualBalance).toBe(expectedBalance);
  });
});

describe('Update balance after withdraw', () => {
  it('should return the original balance when the withdraw amount is zero', () => {
    const currentBalance = 100;
    const withdraw = 0;
    const expectedBalance = 100;
    const actualBalance = Util.getInstance().updateBalanceAfterWithdraw(
      currentBalance,
      withdraw,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should return the correct balance when the withdraw amount is less than the current balance', () => {
    const currentBalance = 100;
    const withdraw = 50;
    const expectedBalance = 50;
    const actualBalance = Util.getInstance().updateBalanceAfterWithdraw(
      currentBalance,
      withdraw,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should throw an error when the withdraw amount is greater than the current balance', () => {
    const currentBalance = 100;
    const withdraw = 200;
    expect(() =>
      Util.getInstance().updateBalanceAfterWithdraw(currentBalance, withdraw),
    ).toThrowError(
      'The withdraw amount cannot be greater than the current balance.',
    );
  });
});

describe('Update balance after transfer out', () => {
  it('should throw an error when the transfer amount is less than zero', () => {
    expect(() =>
      Util.getInstance().updateBalanceAfterTransferOut(100, -50),
    ).toThrowError('The transfer amount cannot be smaller than zero.');
  });

  it('should return the original balance when the transfer amount is zero', () => {
    const currentBalance = 100;
    const transfer = 0;
    const expectedBalance = 100;
    const actualBalance = Util.getInstance().updateBalanceAfterTransferOut(
      currentBalance,
      transfer,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should return the correct balance when the transfer amount is less than the current balance', () => {
    const currentBalance = 100;
    const transfer = 50;
    const expectedBalance = 50;
    const actualBalance = Util.getInstance().updateBalanceAfterTransferOut(
      currentBalance,
      transfer,
    );
    expect(actualBalance).toBe(expectedBalance);
  });
});

describe('Update balance after receive transfer', () => {
  it('should throw an error when the transfer amount is less than zero', () => {
    expect(() =>
      Util.getInstance().updateBalanceAfterReceiveTransfer(100, -50),
    ).toThrowError('The transfer amount cannot be smaller than zero.');
  });

  it('should return the original balance when the transfer amount is zero', () => {
    const currentBalance = 100;
    const transfer = 0;
    const expectedBalance = 100;
    const actualBalance = Util.getInstance().updateBalanceAfterReceiveTransfer(
      currentBalance,
      transfer,
    );
    expect(actualBalance).toBe(expectedBalance);
  });

  it('should return the correct balance when the transfer amount is greater than zero', () => {
    const currentBalance = 100;
    const transfer = 50;
    const expectedBalance = 150;
    const actualBalance = Util.getInstance().updateBalanceAfterReceiveTransfer(
      currentBalance,
      transfer,
    );
    expect(actualBalance).toBe(expectedBalance);
  });
});
