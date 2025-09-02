import { Inject, Injectable } from "@nestjs/common";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import type { DepositAdapterInterface } from "src/events/domain/application/adapters/deposit-adapter.interface";
import { DepositStrategyInterface } from "src/events/domain/application/strategies/deposit-strategy.interface";
import { DepositResponseDto } from "src/events/domain/dto/deposit-response.dto";
import { EventDto } from "src/events/domain/dto/event.dto";


@Injectable()
export class DepositServiceStrategy implements DepositStrategyInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_ADAPTER) private readonly depositAdapter: DepositAdapterInterface
    ) {}

    async executeTransaction(event: EventDto): Promise<DepositResponseDto> {

        const depositData = this.validateEvent(event);

        const account = await this.accountService.findAccountById(depositData.id);

        if (!account) {
            const newAccount = await this.accountService.createAccount(depositData);
            return this.depositAdapter.adapt(newAccount);
        }

        const update = await this.accountService.deposit(account, depositData.balance);
        return this.depositAdapter.adapt(update);
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
}