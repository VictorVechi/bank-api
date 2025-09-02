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
        ) {}
    async executeTransaction(event: EventDto): Promise<TransferResponseDto> {

        const transferData = this.validateEvent(event);

        let originAccount = await this.validateOrigin(transferData.origin);
        let destinationAccount = await this.getDestination(transferData.destination);

        originAccount = await this.accountService.withdraw(originAccount, transferData.amount);
        destinationAccount = await this.accountService.deposit(destinationAccount, transferData.amount);
        
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

    private async validateOrigin(id: string): Promise<Account> {
        const account = await this.accountService.findAccountById(id);
        if (!account) {
            throw new Error("Origin account not found");
        }
        return account;
    }

    private async getDestination(id: string): Promise<Account> {
        let account = await this.accountService.findAccountById(id);
        if (!account) {
            const newAccount: AccountModel = {
                id: id,
                balance: 0,
            };

            return await this.accountService.createAccount(newAccount);
        }

        return account;
    }
}