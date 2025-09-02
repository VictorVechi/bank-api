import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { TransferStrategyInterface } from "src/events/domain/application/strategies/transfer-strategy.interface";
import { EventDto } from "src/events/domain/dto/event.dto";
import { TransferResponseDto } from "src/events/domain/dto/transfer-response.dto";
import { TransferDto } from "src/events/domain/dto/transfer.dto";
import { OperationEnum } from "src/events/domain/enum/operation.enum";


@Injectable()
export class TransferServiceStrategy implements TransferStrategyInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface
        ) {}
    async executeTransaction(event: EventDto): Promise<any> {

        // const transferData = this.validateEvent(event);

        // const originAccount = await this.accountService.findAccountById(transferData.origin);

        // if (!originAccount) {
        //     return null;
        // }

        // const newOriginBalance = this.handleOperation(transferData, originAccount, OperationEnum.DEBIT);

        // const destinationAccount = await this.getOrCreateDestinationAccount(transferData.destination);
        // const newDestinationBalance = this.handleOperation(transferData, destinationAccount, OperationEnum.CREDIT);

        // const updatedAccounts = this.getUpdatedAccounts(originAccount, newOriginBalance, destinationAccount, newDestinationBalance);

        // const savedAccounts = await this.accountService.saveAccounts(updatedAccounts);

        // const [originAccountSaved, destinationAccountSaved] = savedAccounts;
        // return this.toJson(originAccountSaved, destinationAccountSaved);

    }

    // private validateEvent(event: EventDto): TransferDto {
    //     if (!event.origin || !event.destination || event.amount <= 0) {
    //         throw new Error("Invalid transfer event data");
    //     }

    //     return {
    //         origin: event.origin,
    //         destination: event.destination,
    //         amount: event.amount,
    //     };
    // }

    // private handleOperation(event: TransferDto, account: Account, operation: string): number {
    //     let newBalance: number = 0;
    //     switch (operation) {
    //         case OperationEnum.DEBIT:
    //             if (account.balance.toNumber() < event.amount) {
    //                 throw new Error("Insufficient funds for transfer");
    //             }
    //             newBalance = ((account.balance.toNumber() * 1000) - (event.amount * 1000)) / 1000;
    //             break;
    //         case OperationEnum.CREDIT:
    //             newBalance = ((account.balance.toNumber() * 1000) + (event.amount * 1000)) / 1000;
    //             break;
    //     }
    //     return newBalance;
    // }

    // private async getOrCreateDestinationAccount(destinationId: string): Promise<Account> {
    //     let destinationAccount = await this.accountService.findAccountById(destinationId);

    //     if (!destinationAccount) {
    //         const newAccount: AccountModel = {
    //             id: destinationId,
    //             balance: 0,
    //         };

    //         destinationAccount = await this.accountService.saveAccount(newAccount);
    //     }

    //     return destinationAccount;
    // }


    // private getUpdatedAccounts(originAccount: Account, newOriginBalance: number, destinationAccount: Account, newDestinationBalance: number): AccountModel[] {
    //     return [
    //         {
    //             ...originAccount,
    //             balance: newOriginBalance,
    //             updatedAt: new Date(),
    //         },
    //         {
    //             ...destinationAccount,
    //             balance: newDestinationBalance,
    //             updatedAt: new Date(),
    //         }
    //     ];
    // }

    // private toJson(originAccount: Account, destinationAccount: Account): TransferResponseDto {
    //     return {
    //         origin: {
    //             id: originAccount.id,
    //             balance: originAccount.balance.toNumber(),
    //         },
    //         destination: {
    //             id: destinationAccount.id,
    //             balance: destinationAccount.balance.toNumber(),
    //         },
    //     };
    // }
}