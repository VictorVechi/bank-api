import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { EventManagerInterface } from 'src/account/domain/application/event-manager.interface';
import type { AccountBalanceInterface } from 'src/account/domain/application/services/account-balance.interface';
import { EventDto } from 'src/account/domain/dto/event.dto';
import { DependencyInjectionEnum } from 'src/dependencyInjection/dependency-injection.enum';

@Controller()
export class AccountController {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_BALANCE_SERVICE) private readonly accountBalance: AccountBalanceInterface,
        @Inject(DependencyInjectionEnum.EVENT_MANAGER) private readonly eventManager: EventManagerInterface
    ) { }

    @Post('/reset')
    async reset(@Res() res: Response): Promise<void> {
        try {
            await this.accountBalance.reset();
            res.sendStatus(HttpStatus.OK);
        } catch (error) {
            console.error('Error resetting account table:', error);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/balance')
    async getBalance(@Res() res: Response, @Query('account_id') accountId: string): Promise<void> {
        try {
            const balance = await this.accountBalance.getBalance(accountId);
            res.status(HttpStatus.OK).send(balance);
        } catch (error) {
            console.error('Error fetching account balance:', error);
            res.status(HttpStatus.NOT_FOUND).send(0);
        }
    }

    @Post('/event')
        async handleEvent(@Body() body: EventDto, @Res() res: Response): Promise<void> {
            try {
                const response = await this.eventManager.processEvent(body);
                res.status(HttpStatus.CREATED).send(response);
            } catch (error) {
                console.error('Error processing event:', error);
                res.status(HttpStatus.NOT_FOUND).send(0);
            }
        }
}
