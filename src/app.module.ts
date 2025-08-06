import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './events/event.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [EventModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
