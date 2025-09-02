import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { EventDto } from "src/account/domain/dto/event.dto";
import { TransferResponseDto } from "src/account/domain/dto/transfer-response.dto";
import { TransferDto } from "src/account/domain/dto/transfer.dto";
import { TransferStrategyInterface } from "src/account/domain/application/strategies/transfer-strategy.interface";
import type { TransferAdapterInterface } from "src/account/domain/application/adapters/transfer-adapter.interface";


@Injectable()
export class TransferServiceStrategy implements TransferStrategyInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_ADAPTER) private readonly transferAdapter: TransferAdapterInterface
    ) { }
    async executeTransaction(event: EventDto): Promise<TransferResponseDto> {

        const transferData = this.validateEvent(event);

        let originAccount = await this.transferFrom(transferData);
        let destinationAccount = await this.transferTo(transferData);

        return this.transferAdapter.adapt(originAccount, destinationAccount);

    }

    private validateEvent(event: EventDto): TransferDto {
        if (!event.origin || !event.destination || event.amount <= 0) {
            throw new Error("Invalid transfer event data");
        }

        return {
            origin: event.origin,
            destination: event.destination,
            amount: event.amount,
        };
    }

    private async transferFrom(transferData: TransferDto): Promise<Account> {
        let account = await this.accountService.findAccountById(transferData.origin);
        if (!account) {
            throw new Error("Origin account not found");
        }

        account = await this.accountService.withdraw(account, transferData.amount);

        return account;
    }

    private async transferTo(transferData: TransferDto): Promise<Account> {
        let account = await this.accountService.findAccountById(transferData.destination);
        if (!account) {
            const newAccount: AccountModel = {
                id: transferData.destination,
                balance: 0,
            };

            account = await this.accountService.createAccount(newAccount);
        }

        account = await this.accountService.deposit(account, transferData.amount);
        return account;
    }
}