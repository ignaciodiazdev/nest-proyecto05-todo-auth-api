import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger('Api-project');

  constructor(configService: ConfigService){
    // Obtenemos la URL de la base de datos
    const url = configService.get<string>('DATABASE_URL');
    console.log('Intentando conectar a:', url);

    // Configuramos el pool de PostgreSQL
    const pool = new Pool({ connectionString: url });

    // Creamos el adaptador para Prisma v7
    const adapter = new PrismaPg(pool);

    // Pasamos el adaptador a la clase base
    super({ adapter });
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
