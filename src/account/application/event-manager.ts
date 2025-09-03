import { Inject, Injectable } from '@nestjs/common';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';
import type { DepositUseCaseInterface } from '../domain/application/use-cases/deposit-use-case.interface';
import type { TransferUseCaseInterface } from '../domain/application/use-cases/transfer-use-case.interface';
import type { WithdrawUseCaseInterface } from '../domain/application/use-cases/withdraw-use-case.interface';
import { EventType } from '../domain/enum/event-enum';
import { EventDto } from '../domain/dto/event.dto';
import { EventResponseDto } from '../domain/dto/event-response.dto';
import { EventManagerInterface } from '../domain/application/event-manager.interface';




@Injectable()
export class EventManager implements EventManagerInterface {
    constructor(
        @Inject(DependencyInjectionEnum.DEPOSIT_CASE) private readonly depositAction: DepositUseCaseInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_CASE) private readonly transferAction: TransferUseCaseInterface,
        @Inject(DependencyInjectionEnum.WITHDRAW_CASE) private readonly withdrawAction: WithdrawUseCaseInterface,
    ) {}

    async processEvent(event: EventDto): Promise<EventResponseDto> {
        switch (event.type.toLowerCase()) {
            case EventType.DEPOSIT:
                return await this.depositAction.execute(event);
            case EventType.TRANSFER:
                return await this.transferAction.execute(event);
            case EventType.WITHDRAW:
                return await this.withdrawAction.execute(event);
            default:
                throw new Error(`Unknown event type: ${event.type}`);
        }
    }
}
