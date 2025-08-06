import { Body, Controller, Post } from "@nestjs/common";
import { EventDto } from "src/events/domain/dto/event.dto";




@Controller() 
export class EventController {
    constructor() {}

    @Post('/event')
    async handleEvent(@Body() body: EventDto): Promise<any> {
        // Logic to handle the event
        return { message: "Event handled successfully" };
    }
}