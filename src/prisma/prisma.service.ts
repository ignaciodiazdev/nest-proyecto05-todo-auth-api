import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger('Api-project');

  constructor(){
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter});
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected')
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
      throw Error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.error('Database disconnected');
  }
}
