import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AccountRepository } from './account/domain/repository/account-repository';
import { PrismaAccountRepository } from './account/infrastructure/repository/prisma-account-repository';
import { EventController } from './events/infrastructure/controller/event.controller';
import { AccountService } from './account/application/account.service';
import { EventContextService } from './events/application/event-context.service';
import { EventContextInterface } from './events/domain/application/event-context-interface';

@Module({
  imports: [],
  controllers: [
    EventController,
    AppController,
  ],
  providers: [
    PrismaService,
    AccountService,
    {
      provide: EventContextInterface,
      useClass: EventContextService
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository
    }
  ],
})
export class AppModule {}
