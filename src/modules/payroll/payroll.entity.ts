import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TransactionType } from 'src/enums/transaction.type.enum';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_account_id: number;

  @Column()
  reference_account_id: number;

  @Column()
  transaction_type: TransactionType;

  @Column()
  amount: number;

  @Column()
  transaction_date: Date;
}
