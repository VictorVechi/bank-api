import { EventResponseDto } from "../dto/event-response.dto";
import { EventDto } from "../dto/event.dto";


export interface EventStrategy {
    executeTransaction(event: EventDto): Promise<EventResponseDto>;
}