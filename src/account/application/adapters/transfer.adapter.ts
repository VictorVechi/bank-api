import { Account } from "@prisma/client";
import { TransferAdapterInterface } from "src/account/domain/application/adapters/transfer-adapter.interface";
import { TransferResponseDto } from "src/account/domain/dto/transfer-response.dto";


export class TransferAdapter implements TransferAdapterInterface {
    adapt(origin: Account, destination: Account): TransferResponseDto {
        return {
            origin: {
                id: origin.id,
                balance: origin.balance,
            },
            destination: {
                id: destination.id,
                balance: destination.balance,
            }
        };
    }
}