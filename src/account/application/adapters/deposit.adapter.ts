import { Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import { DepositAdapterInterface } from "src/account/domain/application/adapters/deposit-adapter.interface";
import { DepositResponseDto } from "src/account/domain/dto/deposit-response.dto";
import { EventDto } from "src/account/domain/dto/event.dto";
import { AccountModel } from "src/account/domain/entity/account.entity";
@Injectable()
export class DepositAdapter implements DepositAdapterInterface {

    adapt(account: Account): DepositResponseDto {
        return {
            destination: {
                id: account.id,
                balance: account.balance,
            }
        };
    }
}