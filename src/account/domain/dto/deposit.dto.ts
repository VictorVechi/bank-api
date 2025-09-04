

export class DepositDto {
    destination: string;
    amount: number;

    constructor(destination: string, amount: number) {
        this.destination = destination;
        this.amount = amount;
    }
}