

import { Inject, Injectable } from '@nestjs/common';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import type { AccountRepositoryInterface } from 'src/account/domain/repository/account-repository.interface';
import { AccountBalanceInterface } from 'src/account/domain/application/services/account-balance.interface';


@Injectable()
export class AccountBalanceService implements AccountBalanceInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
    ) {}

    async reset(): Promise<void> {
        return await this.accountRepository.resetTable();
    }

    async getBalance(accountId: string): Promise<number> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error("Account not found");
        }
        return account.balance;
    }
}
