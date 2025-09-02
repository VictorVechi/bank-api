import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { AccountRepositoryInterface } from "src/account/domain/repository/account-repository.interface";
import type { PrismaServiceInterface } from "src/database/domain/prisma-service.interface";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";

@Injectable()
export class PrismaAccountRepository implements AccountRepositoryInterface {
    constructor(
        @Inject(DependencyInjectionEnum.PRISMA_SERVICE) private readonly prismaService: PrismaServiceInterface
    ) {}

    async findById(id: string): Promise<Account | null> {
        return this.prismaService.account.findUnique({
            where: { id },
        });
    }

    async save(account: AccountModel): Promise<Account> {
        const result = await this.prismaService.account.upsert({
            where: { id: account.id },
            create: account,
            update: account,
        });

        return result;
    }

    async saveAll(accounts: AccountModel[]): Promise<Account[]> {
        const savedAccounts: Account[] = [];
        for (const account of accounts) {
            const savedAccount = await this.save(account);
            savedAccounts.push(savedAccount);
        }
        return savedAccounts;
    }

    async resetTable(): Promise<void> {
        await this.prismaService.account.deleteMany({});
    }

}