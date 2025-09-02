import { Account } from "@prisma/client";
import { WithdrawAdapterInterface } from "src/events/domain/application/adapters/withdraw-adapter.interface";
import { WithdrawResponseDto } from "src/events/domain/dto/withdraw-response.dto";



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