import { Account } from "@prisma/client";


export interface AccountServiceInterface {
    reset(): Promise<void>;
    findAccountById(accountId: string): Promise<any>;
    deposit(account: Account, amount: number): Promise<Account>;
    withdraw(account: Account, amount: number): Promise<Account | null>;
    getBalance(accountId: string): Promise<number | null>;
}