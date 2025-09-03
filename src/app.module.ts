import { Module } from '@nestjs/common';
import { PrismaService } from './database/application/prisma.service';
import { PrismaAccountRepository } from './account/infra/repository/prisma-account-repository';
import { AccountService } from './account/application/account.service';
import { AccountController } from './account/infra/controller/account.controller';
import { DependencyInjectionEnum } from './dependencyInjection/dependency-injection.enum';
import { DepositAdapter } from './account/application/adapters/deposit.adapter';
import { WithdrawAdapter } from './account/application/adapters/withdraw.adapter';
import { TransferAdapter } from './account/application/adapters/transfer.adapter';
import { EventManager } from './account/application/event-manager';
import { DepositUseCase } from './account/application/use-cases/deposit.use-case';
import { WithdrawUseCase } from './account/application/use-cases/withdraw.use-case';
import { TransferUseCase } from './account/application/use-cases/transfer.use-case';

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
            provide: DependencyInjectionEnum.EVENT_MANAGER,
            useClass: EventManager
        },
        {
            provide: DependencyInjectionEnum.ACCOUNT_REPOSITORY,
            useClass: PrismaAccountRepository
        },
        {
            provide: DependencyInjectionEnum.DEPOSIT_CASE,
            useClass: DepositUseCase
        },
        {
            provide: DependencyInjectionEnum.WITHDRAW_CASE,
            useClass: WithdrawUseCase
        },
        {
            provide: DependencyInjectionEnum.TRANSFER_CASE,
            useClass: TransferUseCase
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
