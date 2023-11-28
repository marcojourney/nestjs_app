import { PartialType } from '@nestjs/swagger';
import { CreatePayrollDto } from './create-payroll.dto';

export class UpdateTransactionDto extends PartialType(CreatePayrollDto) {}
