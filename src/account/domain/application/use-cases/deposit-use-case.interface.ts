import { DepositResponseDto } from "../../dto/deposit-response.dto";
import { EventDto } from "../../dto/event.dto";

export interface DepositUseCaseInterface {
    execute(event: EventDto): Promise<DepositResponseDto>
}