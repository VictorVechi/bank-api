import { Body, Controller, Post, Res } from "@nestjs/common";
import { EventContextService } from "src/events/application/event-context.service";
import { EventContextInterface } from "src/events/domain/application/event-context-interface";
import { EventDto } from "src/events/domain/dto/event.dto";




@Controller() 
export class EventController {
    constructor(private readonly eventContext: EventContextInterface) {}

    @Post('/event')
    async handleEvent(@Body() body: EventDto, @Res() res): Promise<any> {
        try {
            const response = await this.eventContext.processEvent(body);
            res.status(200).send(response);
        } catch (error) {
            console.error('Error processing event:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}