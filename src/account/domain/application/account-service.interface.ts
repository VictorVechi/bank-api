import { Account } from "@prisma/client";
import { AccountModel } from "../entity/account.entity";


export interface AccountServiceInterface {
    reset(): Promise<void>;
    findAccountById(accountId: string): Promise<Account | null>;
    createAccount(account: AccountModel): Promise<Account>
    deposit(account: Account, amount: number): Promise<Account>;
    withdraw(account: Account, amount: number): Promise<Account>;
    getBalance(accountId: string): Promise<number | null>;
}