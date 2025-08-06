import { Injectable } from '@nestjs/common';
import { EventDto } from '../domain/dto/event.dto';
import { EventContextInterface } from '../domain/application/event-context-interface';

@Injectable()
export class EventContextService implements EventContextInterface {

    async processEvent(event: EventDto): Promise<any> {
        
    }

}
