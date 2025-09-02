import { EventResponseDto } from "../dto/event-response.dto";
import { EventDto } from "../dto/event.dto";


export interface EventContextInterface {
    processEvent(event: EventDto): Promise<EventResponseDto>
}