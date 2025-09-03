import { Inject, Injectable } from "@nestjs/common";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { DepositResponseDto } from "src/account/domain/dto/deposit-response.dto";
import { EventDto } from "src/account/domain/dto/event.dto";
import type { DepositAdapterInterface } from "src/account/domain/application/adapters/deposit-adapter.interface";
import { DepositUseCaseInterface } from "src/account/domain/application/use-cases/deposit-use-case.interface";


@Injectable()
export class DepositUseCase implements DepositUseCaseInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_ADAPTER) private readonly depositAdapter: DepositAdapterInterface
    ) {}

    async execute(event: EventDto): Promise<DepositResponseDto> {

        const depositData = this.validateEvent(event);

        let account = await this.accountService.findAccountById(depositData.id);

        if (!account) {
            const newAccount = await this.accountService.createAccount(depositData);
            return this.depositAdapter.adapt(newAccount);
        }

        account = await this.accountService.deposit(account, depositData.balance);
        return this.depositAdapter.adapt(account);
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