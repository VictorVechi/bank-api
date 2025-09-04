import { Account } from "@prisma/client";
import { DepositResponseDto } from "../../dto/deposit-response.dto";
import { EventDto } from "../../dto/event.dto";
import { AccountModel } from "../../entity/account.entity";


export interface DepositAdapterInterface {
    adapt(account: Account): DepositResponseDto;
}