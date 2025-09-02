import { Account } from "@prisma/client";
import { DepositResponseDto } from "../../dto/deposit-response.dto";


export interface DepositAdapterInterface {
    adapt(account: Account): DepositResponseDto;
}