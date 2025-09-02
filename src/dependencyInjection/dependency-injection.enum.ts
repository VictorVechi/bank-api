

export enum DependencyInjectionEnum {
    ACCOUNT_SERVICE = 'AccountServiceInterface',
    EVENT_CONTEXT = 'EventContextInterface',
    ACCOUNT_REPOSITORY = 'AccountRepositoryInterface',
    PRISMA_SERVICE = 'PrismaServiceInterface',

    EVENT_CONTROLLER = 'EventControllerInterface',

    // Strategies
    DEPOSIT_STRATEGY = 'DepositStrategyInterface',
    WITHDRAW_STRATEGY = 'WithdrawStrategyInterface',
    TRANSFER_STRATEGY = 'TransferStrategyInterface',
}