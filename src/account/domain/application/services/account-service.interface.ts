import { Account } from "@prisma/client";

export interface AccountTransactionInterface {
    deposit(account: Account, amount: number): Account;
    withdraw(account: Account, amount: number): Account;
}