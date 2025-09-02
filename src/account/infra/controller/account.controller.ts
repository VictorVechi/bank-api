import { Controller, Get, HttpStatus, Inject, Param, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { AccountServiceInterface } from 'src/account/domain/application/account-service.interface';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';

@Controller()
export class AccountController {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_SERVICE) private readonly accountService: AccountServiceInterface
    ) { }

    @Post('/reset')
    async reset(@Res() res: Response): Promise<void> {
        try {
            await this.accountService.reset();
            res.sendStatus(HttpStatus.OK);
        } catch (error) {
            console.error('Error resetting account table:', error);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/balance')
    async getBalance(@Res() res: Response, @Query('account_id') accountId: string): Promise<void> {
        try {
            const balance = await this.accountService.getBalance(accountId);
            if (!balance) {
                res.status(HttpStatus.NOT_FOUND).send(0);
                return;
            }
            res.status(HttpStatus.OK).send(balance);
        } catch (error) {
            console.error('Error fetching account balance:', error);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
