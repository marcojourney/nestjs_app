import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { OwnersModule } from './modules/owners/owners.module';
import { Cat } from './modules/cats/cat.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Owner } from './modules/owners/owner.entity';
import { AppController } from './app.controller';
import { CustomersModule } from './modules/customers/customers.module';
import { BankAccountModule } from './modules/bank_account/bank_account.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { Customer } from './modules/customers/entities/customer.entity';
import { Transaction } from './modules/transaction/transaction.entity';
import { BankAccount } from './modules/bank_account/entities/bank_account.entity';
import { RolesModule } from './modules/roles/roles.module';
import { Session } from './modules/auth/session.entity';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Role,
        Cat,
        Owner,
        Customer,
        Transaction,
        BankAccount,
        Session
      ],
      logging: true,
    }),
    CatsModule,
    OwnersModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    TransactionModule,
    BankAccountModule,
    RolesModule
  ],
})
export class AppModule {}
