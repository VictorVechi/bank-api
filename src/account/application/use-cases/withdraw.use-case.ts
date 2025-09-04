import { Inject, Injectable } from "@nestjs/common";
import { AccountModel } from "src/account/domain/entity/account.entity";
import { DependencyInjectionEnum } from "src/dependencyInjection/dependency-injection.enum";
import { EventDto } from "src/account/domain/dto/event.dto";
import { WithdrawResponseDto } from "src/account/domain/dto/withdraw-response.dto";
import type { AccountServiceInterface } from "src/account/domain/application/account-service.interface";
import type { WithdrawAdapterInterface } from "src/account/domain/application/adapters/withdraw-adapter.interface";
import type { AccountRepositoryInterface } from "src/account/domain/repository/account-repository.interface";
import type { WithdrawValidatorInterface } from "src/account/domain/application/validator/withdraw-validator.interface";
import { WithdrawUseCaseInterface } from "src/account/domain/application/use-cases/withdraw-use-case.interface";


@Injectable()
export class WithdrawUseCase implements WithdrawUseCaseInterface {
    constructor(
            @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface,
            @Inject(DependencyInjectionEnum.WITHDRAW_ADAPTER) private readonly withdrawAdapter: WithdrawAdapterInterface,
            @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
            @Inject(DependencyInjectionEnum.WITHDRAW_VALIDATOR) private readonly withdrawValidator: WithdrawValidatorInterface,
        ) {}
    async execute(event: EventDto): Promise<WithdrawResponseDto> {
        this.withdrawValidator.execute(event);
        let account = await this.accountRepository.findById(event.origin!);

        if (!account) {
            throw new Error("Origin account not found");
        }

        account = this.accountService.withdraw(account, event.amount);

        await this.accountRepository.save(account);
        
        return this.withdrawAdapter.adapt(account);
    }
}