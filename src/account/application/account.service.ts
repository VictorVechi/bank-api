import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountServiceInterface } from '../domain/application/account-service.interface';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import type { AccountRepositoryInterface } from '../domain/repository/account-repository.interface';
import { AccountModel } from '../domain/entity/account.entity';

@Injectable()
export class AccountService implements AccountServiceInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface
    ) {}
    async reset(): Promise<void> {
        try {
            await this.accountRepository.resetTable();
        } catch (error) {
            console.error('Error resetting account table:', error);
            throw new Error('Failed to reset account table');
        }
    }

    async findAccountById(id: string): Promise<Account | null> {
        try {
            return await this.accountRepository.findById(id);
        } catch (error) {
            console.error('Error finding account by ID:', error);
            throw new Error('Failed to find account');
        }
    }
    async createAccount(account: AccountModel): Promise<Account> {
        return await this.accountRepository.save(account);
    }

    async deposit(account: Account, amount: number): Promise<Account> {

        account.balance += amount;

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
        try {
            const account = await this.findAccountById(accountId);
            if (!account) {
                return null;
            }
            return account.balance;
        } catch (error) {
            console.error('Error fetching account balance:', error);
            throw new Error('Failed to fetch account balance');
        }
    }
}
