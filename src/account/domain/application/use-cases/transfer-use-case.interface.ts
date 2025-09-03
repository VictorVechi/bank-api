import { EventDto } from "../../dto/event.dto";
import { TransferResponseDto } from "../../dto/transfer-response.dto";


export interface TransferUseCaseInterface {
    execute(event: EventDto): Promise<TransferResponseDto>
}