import { Module } from '@nestjs/common';
import { PrismaService } from './database/application/prisma.service';
import { PrismaAccountRepository } from './account/infra/repository/prisma-account-repository';
import { AccountService } from './account/application/account.service';
import { EventContextService } from './account/application/event-context.service';
import { DepositServiceStrategy } from './account/application/strategies/deposit.service';
import { TransferServiceStrategy } from './account/application/strategies/transfer.service';
import { WithdrawServiceStrategy } from './account/application/strategies/withdraw.service';
import { AccountController } from './account/infra/controller/account.controller';
import { DependencyInjectionEnum } from './dependencyInjection/dependency-injection.enum';
import { DepositAdapter } from './account/application/adapters/deposit.adapter';
import { WithdrawAdapter } from './account/application/adapters/withdraw.adapter';
import { TransferAdapter } from './account/application/adapters/transfer.adapter';

@Module({
    imports: [],
    controllers: [
        AccountController,
    ],
    providers: [
        {
            provide: DependencyInjectionEnum.PRISMA_SERVICE,
            useClass: PrismaService
        },
        {
            provide: DependencyInjectionEnum.ACCOUNT_SERVICE,
            useClass: AccountService
        },
        {
            provide: DependencyInjectionEnum.EVENT_CONTEXT,
            useClass: EventContextService
        },
        {
            provide: DependencyInjectionEnum.ACCOUNT_REPOSITORY,
            useClass: PrismaAccountRepository
        },
        {
            provide: DependencyInjectionEnum.DEPOSIT_STRATEGY,
            useClass: DepositServiceStrategy
        },
        {
            provide: DependencyInjectionEnum.WITHDRAW_STRATEGY,
            useClass: WithdrawServiceStrategy
        },
        {
            provide: DependencyInjectionEnum.TRANSFER_STRATEGY,
            useClass: TransferServiceStrategy
        },
        {
            provide: DependencyInjectionEnum.DEPOSIT_ADAPTER,
            useClass: DepositAdapter
        },
        {
            provide: DependencyInjectionEnum.WITHDRAW_ADAPTER,
            useClass: WithdrawAdapter
        },
        {
            provide: DependencyInjectionEnum.TRANSFER_ADAPTER,
            useClass: TransferAdapter
        }
    ],
})
export class AppModule { }
