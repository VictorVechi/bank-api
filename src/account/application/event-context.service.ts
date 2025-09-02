import { Inject, Injectable } from '@nestjs/common';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import { EventContextInterface } from '../domain/application/event-context-interface';
import type { DepositStrategyInterface } from '../domain/application/strategies/deposit-strategy.interface';
import type { TransferStrategyInterface } from '../domain/application/strategies/transfer-strategy.interface';
import type { WithdrawStrategyInterface } from '../domain/application/strategies/withdraw-strategy.interface';
import { EventType } from '../domain/enum/event-enum';
import { EventDto } from '../domain/dto/event.dto';
import { EventResponseDto } from '../domain/dto/event-response.dto';



@Injectable()
export class EventContextService implements EventContextInterface {
    constructor(
        @Inject(DependencyInjectionEnum.DEPOSIT_STRATEGY) private readonly depositService: DepositStrategyInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_STRATEGY) private readonly transferService: TransferStrategyInterface,
        @Inject(DependencyInjectionEnum.WITHDRAW_STRATEGY) private readonly withdrawService: WithdrawStrategyInterface,
    ) {}

    async processEvent(event: EventDto): Promise<EventResponseDto> {
        switch (event.type.toLowerCase()) {
            case EventType.DEPOSIT:
                return await this.depositService.executeTransaction(event);
            case EventType.TRANSFER:
                return await this.transferService.executeTransaction(event);
            case EventType.WITHDRAW:
                return await this.withdrawService.executeTransaction(event);
            default:
                throw new Error(`Unknown event type: ${event.type}`);
        }
    }
}
