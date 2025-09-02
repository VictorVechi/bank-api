import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { WithdrawStrategyInterface } from "src/events/domain/application/strategies/withdraw-strategy.interface";
import { EventDto } from "src/events/domain/dto/event.dto";
import { WithdrawResponseDto } from "src/events/domain/dto/withdraw-response.dto";


@Injectable()
export class WithdrawServiceStrategy implements WithdrawStrategyInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface
        ) {}
    async executeTransaction(event: EventDto): Promise<any> {
        // const withdrawData = this.validateEvent(event);

        // const account = await this.accountService.findAccountById(withdrawData.id);
        // if (!account) {
        //     return null;
        // }

        // const updatedBalance = this.handleFluctuation(withdrawData, account);

        // const updatedAccount = {
        //     ...account,
        //     balance: updatedBalance,
        //     updatedAt: new Date(),
        // };

        // const savedAccount = await this.accountService.saveAccount(updatedAccount);

        // return this.toJson(savedAccount);
    }

    // private validateEvent(event: EventDto): AccountModel {
    //     if (!event.origin || event.amount <= 0) {
    //         throw new Error("Invalid withdraw event data");
    //     }

    //     return {
    //         id: event.origin,
    //         balance: event.amount,
    //     };
    // }

    // private handleFluctuation(event: AccountModel, account: Account): number {
    //     if (account.balance.toNumber() < event.balance) {
    //         throw new Error("Insufficient funds for withdrawal");
    //     }

    //     return ((account.balance.toNumber() * 1000) - (event.balance * 1000)) / 1000;
    // }

    // private toJson(account: Account): WithdrawResponseDto {
    //     return {
    //         origin: {
    //             id: account.id,
    //             balance: account.balance.toNumber(),
    //         }
    //     };
    // }
}