import { Inject, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import type { TransferAdapterInterface } from "src/account/domain/application/adapters/transfer-adapter.interface";
import type { TransferValidatorInterface } from "src/account/domain/application/validator/transfer-validator.interface";
import type { AccountRepositoryInterface } from "src/account/domain/repository/account-repository.interface";
import type { AccountTransactionInterface } from "src/account/domain/application/services/account-service.interface";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { EventDto } from "src/account/domain/dto/event.dto";
import { TransferResponseDto } from "src/account/domain/dto/transfer-response.dto";
import { TransferUseCaseInterface } from "src/account/domain/application/use-cases/transfer-use-case.interface";


@Injectable()
export class TransferUseCase implements TransferUseCaseInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION_SERVICE) private readonly accountTransaction: AccountTransactionInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_ADAPTER) private readonly transferAdapter: TransferAdapterInterface,
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_VALIDATOR) private readonly transferValidator: TransferValidatorInterface
    ) { }
    async execute(event: EventDto): Promise<TransferResponseDto> {
        this.transferValidator.execute(event);

        const originAccount = await this.transferFrom(event);
        const destinationAccount = await this.transferTo(event); 

        await this.accountRepository.save(originAccount);
        await this.accountRepository.save(destinationAccount);

        return this.transferAdapter.adapt(originAccount, destinationAccount);
    }

    private async transferFrom(transferData: EventDto): Promise<Account> {
        let originAccount = await this.accountRepository.findById(transferData.origin!);
        if (!originAccount) {
            throw new Error("Origin account not found");
        }

        if (originAccount.balance < transferData.amount) {
            throw new Error("Insufficient funds");
        }
        
        return this.accountTransaction.withdraw(originAccount, transferData.amount);
    }

    private async transferTo(transferData: EventDto): Promise<Account> {
        let destinationAccount = await this.accountRepository.findById(transferData.destination!);

        if (!destinationAccount) {
            const newAccount: AccountModel = {
                id: transferData.destination!,
                balance: 0,
            };
            destinationAccount = await this.accountRepository.save(newAccount);
        }
        return this.accountTransaction.deposit(destinationAccount, transferData.amount);
    }
}