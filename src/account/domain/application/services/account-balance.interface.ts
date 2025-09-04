

export interface AccountBalanceInterface {
    getBalance(accountId: string): Promise<number>;
    reset(): Promise<void>;
}