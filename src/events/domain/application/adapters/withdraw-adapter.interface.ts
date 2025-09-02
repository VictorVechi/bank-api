import { Account } from "@prisma/client";
import { WithdrawResponseDto } from "../../dto/withdraw-response.dto";


export interface WithdrawAdapterInterface {
    adapt(account: Account): WithdrawResponseDto;
}