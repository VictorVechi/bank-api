import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountServiceInterface } from '../domain/application/account-service.interface';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import type { AccountRepositoryInterface } from '../domain/repository/account-repository.interface';
import { AccountModel } from '../domain/entity/account.entity';

@Injectable()
export class AccountBalanceService implements AccountServiceInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface
    ) { }

    async reset(): Promise<void> {
        await this.accountRepository.resetTable();
    }

    async deposit(account: Account, amount: number): Promise<Account> {
        account.balance += amount;
        account.updatedAt = new Date();

        return await this.accountRepository.save(account);
    }

    async withdraw(account: Account, amount: number): Promise<Account> {
        if (account.balance < amount) {
            throw new Error('Insufficient funds');
        }

        account.balance -= amount;
        account.updatedAt = new Date();

        return await this.accountRepository.save(account);
    }

    async getBalance(accountId: string): Promise<number | null> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            return null;
        }
        return account.balance;
    }
}
