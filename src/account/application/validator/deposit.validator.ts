



import { BadRequestException, Injectable } from "@nestjs/common";
import { EventDto } from "src/account/domain/dto/event.dto";
import { DepositValidatorInterface } from "src/account/domain/application/validator/deposit-validator.interface";



@Injectable()
export class DepositValidator implements DepositValidatorInterface {

    execute(event: EventDto): void {
        if (!event.destination) {
            throw new BadRequestException('Dados inválidos para depósito');
        }
    }

}