import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountServiceInterface } from '../domain/application/account-service.interface';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import type { AccountRepositoryInterface } from '../domain/repository/account-repository.interface';
import { AccountModel } from '../domain/entity/account.entity';

@Injectable()
export class AccountService implements AccountServiceInterface {

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
