import { Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import { DepositAdapterInterface } from "src/account/domain/application/adapters/deposit-adapter.interface";
import { DepositResponseDto } from "src/account/domain/dto/deposit-response.dto";
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