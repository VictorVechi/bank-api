import { Response } from "express";
import { EventDto } from "../dto/event.dto";


export interface EventControllerInterface {
    handleEvent(body: EventDto, res: Response): Promise<void>;
}