import { Inject, Injectable } from "@nestjs/common";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import type { WithdrawAdapterInterface } from "src/events/domain/application/adapters/withdraw-adapter.interface";
import { WithdrawStrategyInterface } from "src/events/domain/application/strategies/withdraw-strategy.interface";
import { EventDto } from "src/events/domain/dto/event.dto";


@Injectable()
export class WithdrawServiceStrategy implements WithdrawStrategyInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
            @Inject(DependencyInjectionEnum.WITHDRAW_ADAPTER) private readonly withdrawAdapter: WithdrawAdapterInterface
        ) {}
    async executeTransaction(event: EventDto): Promise<any> {
        const withdrawData = this.validateEvent(event);

        const account = await this.accountService.findAccountById(withdrawData.id);
        if (!account) {
            return null;
        }

        const update = await this.accountService.withdraw(account, withdrawData.balance);
        return this.withdrawAdapter.adapt(update);
    }

    private validateEvent(event: EventDto): AccountModel {
        if (!event.origin || event.amount <= 0) {
            throw new Error("Invalid withdraw event data");
        }

        return {
            id: event.origin,
            balance: event.amount,
        };
    }
}