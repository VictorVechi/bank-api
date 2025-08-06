import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountService } from './account/application/account.service';

@Controller()
export class AppController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/reset')
  @HttpCode(HttpStatus.OK)
  async reset(): Promise<void> {
    await this.accountService.reset();
  }
}
