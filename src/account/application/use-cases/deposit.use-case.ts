import { Inject, Injectable } from "@nestjs/common";
import type { DepositAdapterInterface } from "src/account/domain/application/adapters/deposit-adapter.interface";
import type { AccountRepositoryInterface } from "src/account/domain/repository/account-repository.interface";
import type { DepositValidatorInterface } from "src/account/domain/application/validator/deposit-validator.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { DepositResponseDto } from "src/account/domain/dto/deposit-response.dto";
import { EventDto } from "src/account/domain/dto/event.dto";
import { DepositUseCaseInterface } from "src/account/domain/application/use-cases/deposit-use-case.interface";
import type { AccountTransactionInterface } from "src/account/domain/application/services/account-service.interface";

@Injectable()
export class DepositUseCase implements DepositUseCaseInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION_SERVICE) private readonly accountTransaction: AccountTransactionInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_ADAPTER) private readonly depositAdapter: DepositAdapterInterface,
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_VALIDATOR) private readonly depositValidator: DepositValidatorInterface,
    ) {}

    async execute(event: EventDto): Promise<DepositResponseDto> {

        this.depositValidator.execute(event);
        let account = await this.accountRepository.findById(event.destination!);

        if (!account) {
            const newAccount: AccountModel = {
                id: event.destination!,
                balance: 0,
            };
            account = await this.accountRepository.save(newAccount);
        }

        account = this.accountTransaction.deposit(account, event.amount);

        await this.accountRepository.save(account);
        return this.depositAdapter.adapt(account);
    }
}