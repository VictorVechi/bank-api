import { Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { AccountService } from './account/application/account.service';

@Controller()
export class AppController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/reset')
  async reset(@Response() res): Promise<void> {
    try {
      await this.accountService.reset();
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error('Error resetting account table:', error);
      res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
