import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaServiceInterface } from '../domain/prisma-service.interface';

@Injectable()
export class PrismaService extends PrismaClient implements PrismaServiceInterface {
    async onModuleInit() {
      	await this.$connect();
    }
}