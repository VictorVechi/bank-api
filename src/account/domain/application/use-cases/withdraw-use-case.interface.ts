import { EventDto } from "../../dto/event.dto";
import { WithdrawResponseDto } from "../../dto/withdraw-response.dto";


export interface WithdrawUseCaseInterface {
    execute(event: EventDto): Promise<WithdrawResponseDto>
}