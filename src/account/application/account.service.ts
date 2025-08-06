import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/repository/account-repository';

@Injectable()
export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) {}
    async reset(): Promise<void> {
        try {
            await this.accountRepository.resetTable();
        } catch (error) {
            console.error('Error resetting account table:', error);
            throw new Error('Failed to reset account table');
        }
    }
}
