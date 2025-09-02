import { Account } from "@prisma/client";
import { AccountModel } from "../entity/account.entity";


export interface AccountRepositoryInterface {
    findById(id: string): Promise<Account | null>;
    save(account: AccountModel): Promise<Account>;
    saveAll(accounts: AccountModel[]): Promise<Account[]>
    resetTable(): Promise<void>;
}