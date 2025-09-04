import { EventDto } from "../../dto/event.dto";

export interface EventValidatorInterface {
    execute(event: EventDto): void;
}