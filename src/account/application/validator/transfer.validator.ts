import { BadRequestException, Injectable } from "@nestjs/common";
import { EventDto } from "src/account/domain/dto/event.dto";
import { TransferValidatorInterface } from "src/account/domain/application/validator/transfer-validator.interface";



@Injectable()
export class TransferValidator implements TransferValidatorInterface {

    execute(event: EventDto): void {
        if (!event.destination || !event.origin) {
            throw new BadRequestException('Dados inválidos para depósito');
        }
    }
}