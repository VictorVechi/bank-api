import { Account } from "@prisma/client";
import { WithdrawAdapterInterface } from "src/account/domain/application/adapters/withdraw-adapter.interface";
import { WithdrawResponseDto } from "src/account/domain/dto/withdraw-response.dto";



export class WithdrawAdapter implements WithdrawAdapterInterface {
    adapt(account: Account): WithdrawResponseDto {
        return {
            origin: {
                id: account.id,
                balance: account.balance,
            }
        };
    }
}