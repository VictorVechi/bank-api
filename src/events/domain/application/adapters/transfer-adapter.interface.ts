import { Account } from "@prisma/client";
import { TransferResponseDto } from "../../dto/transfer-response.dto";

export interface TransferAdapterInterface {
    adapt(origin: Account, destination: Account): TransferResponseDto;

}