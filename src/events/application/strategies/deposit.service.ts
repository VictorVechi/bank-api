import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { DepositStrategyInterface } from "src/events/domain/application/strategies/deposit-strategy.interface";
import { DepositResponseDto } from "src/events/domain/dto/deposit-response.dto";
import { EventDto } from "src/events/domain/dto/event.dto";


@Injectable()
export class DepositServiceStrategy implements DepositStrategyInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface
    ) {}

    async executeTransaction(event: EventDto): Promise<any> {

        // const depositData = this.validateEvent(event);

        // const account = await this.accountService.findAccountById(depositData.id);

        // if (!account) {
        //     const newAccount = await this.accountService.dep(depositData);
        //     return this.toJson(newAccount);
        // }

        // const updatedBalance = this.handleFluctuation(depositData, account);

        // const updatedAccount = {
        //     ...account,
        //     balance: updatedBalance,
        //     updatedAt: new Date(),
        // };

        // const savedAccount = await this.accountService.saveAccount(updatedAccount);

        // return this.toJson(savedAccount);
    }

    private validateEvent(event: EventDto): AccountModel {
        if (!event.destination || !event.amount) {
            throw new Error("Invalid deposit event data");
        }

        return {
            id: event.destination,
            balance: event.amount,
        }
    }

    private toJson(account: Account): DepositResponseDto {
        return {
            destination: {
                id: account.id,
                balance: account.balance,
            }
        };
    }
}