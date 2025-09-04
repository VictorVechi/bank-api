import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountTransactionInterface } from '../../domain/application/services/account-service.interface';


@Injectable()
export class AccountTransactionService implements AccountTransactionInterface {

    deposit(account: Account, amount: number): Account {
        account.balance += amount;
        account.updatedAt = new Date();

        return account;
    }

    withdraw(account: Account, amount: number): Account {
        account.balance -= amount;
        account.updatedAt = new Date();

        return account;
    }
}
