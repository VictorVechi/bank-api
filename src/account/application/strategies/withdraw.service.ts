import { Inject, Injectable } from "@nestjs/common";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { EventDto } from "src/account/domain/dto/event.dto";
import { WithdrawResponseDto } from "src/account/domain/dto/withdraw-response.dto";
import { WithdrawStrategyInterface } from "src/account/domain/application/strategies/withdraw-strategy.interface";
import type { WithdrawAdapterInterface } from "src/account/domain/application/adapters/withdraw-adapter.interface";


@Injectable()
export class WithdrawServiceStrategy implements WithdrawStrategyInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
            @Inject(DependencyInjectionEnum.WITHDRAW_ADAPTER) private readonly withdrawAdapter: WithdrawAdapterInterface
        ) {}
    async executeTransaction(event: EventDto): Promise<WithdrawResponseDto> {
        const withdrawData = this.validateEvent(event);

        let account = await this.accountService.findAccountById(withdrawData.id);
        if (!account) {
            throw new Error("Origin account not found");
        }

        account = await this.accountService.withdraw(account, withdrawData.balance);
        return this.withdrawAdapter.adapt(account);
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