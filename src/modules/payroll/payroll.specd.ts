describe('#Payroll', () => {
  it('Give basic salary 500, it should return gross salary 500', () => {
    const basicSalary = 500;
    const grossSalary = getGrossSalary(basicSalary);
    expect(grossSalary).toBe(500);
  });

  it('Give basic salary 500 and bunos 10, should return gross salary 510', () => {
    const basicSalary = 500;
    const bonus = 10;
    const grossSalary = getGrossSalary(basicSalary, bonus);
    expect(grossSalary).toBe(600);
  });

  it('Give basic salary 500 and bunos 10 and overtime 50, should return gross salary 560', () => {
    const basicSalary = 500;
    const bonus = 10;
    const overtime = 50;
    const grossSalary = getGrossSalary(basicSalary, bonus, overtime);
    expect(grossSalary).toBe(560);
  });

  it('Give basic salary 500 and deduction 10, should return gross salary 490', () => {
    const basicSalary = 500;
    const deduction = 10;
    const grossSalary = getGrossSalary(basicSalary, deduction);
    expect(grossSalary).toBe(490);
  });

  it('Give basic salary 500 and overtime 20 and deduction 10, should return gross salary 510', () => {
    const basicSalary = 500;
    const overtime = 20;
    const deduction = 10;
    const grossSalary = getGrossSalary(basicSalary, overtime, deduction);
    expect(grossSalary).toBe(510);
  });
});
