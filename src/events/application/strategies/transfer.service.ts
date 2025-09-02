import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import type { TransferAdapterInterface } from "src/events/domain/application/adapters/transfer-adapter.interface";
import { TransferStrategyInterface } from "src/events/domain/application/strategies/transfer-strategy.interface";
import { EventDto } from "src/events/domain/dto/event.dto";
import { TransferResponseDto } from "src/events/domain/dto/transfer-response.dto";
import { TransferDto } from "src/events/domain/dto/transfer.dto";
import { OperationEnum } from "src/events/domain/enum/operation.enum";


@Injectable()
export class TransferServiceStrategy implements TransferStrategyInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
            @Inject(DependencyInjectionEnum.TRANSFER_ADAPTER) private readonly transferAdapter: TransferAdapterInterface
        ) {}
    async executeTransaction(event: EventDto): Promise<any> {

        const transferData = this.validateEvent(event);

        let originAccount = await this.accountService.findAccountById(transferData.origin);

        if (!originAccount) {
            return null;
        }

        originAccount = await this.accountService.withdraw(originAccount, transferData.amount);

        let destinationAccount = await this.accountService.findAccountById(transferData.destination);

        if (!destinationAccount) {
            const newAccount: AccountModel = {
                id: transferData.destination,
                balance: 0,
            };

            destinationAccount = await this.accountService.createAccount(newAccount);
        }

        const updatedDestinationAccount = await this.accountService.deposit(destinationAccount, transferData.amount);
        
        return this.transferAdapter.adapt(originAccount, updatedDestinationAccount);

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
}