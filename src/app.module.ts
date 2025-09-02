import { Module } from '@nestjs/common';
import { PrismaService } from './database/application/prisma.service';
import { PrismaAccountRepository } from './account/infra/repository/prisma-account-repository';
import { EventController } from './events/infra/controller/event.controller';
import { AccountService } from './account/application/account.service';
import { EventContextService } from './events/application/event-context.service';
import { DepositServiceStrategy } from './events/application/strategies/deposit.service';
import { TransferServiceStrategy } from './events/application/strategies/transfer.service';
import { WithdrawServiceStrategy } from './events/application/strategies/withdraw.service';
import { AccountController } from './account/infra/controller/account.controller';
import { DependencyInjectionEnum } from './dependencyInjection/dependency-injection.enum';
import { DepositAdapter } from './events/application/adapters/deposit.adapter';
import { WithdrawAdapter } from './events/application/adapters/withdraw.adapter';
import { TransferAdapter } from './events/application/adapters/transfer.adapter';

@Module({
    imports: [],
    controllers: [
        EventController,
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
