/** @format */

import {PrismaClient} from '@prisma/client';
import {Pool} from 'pg';
import {PrismaPg} from '@prisma/adapter-pg';
import logger from './logger';
import env from './env';

class Database {
  private static instance: PrismaClient | null = null;
  private static pool: Pool | null = null;
  private static isConnected: boolean = false;

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      if (!Database.pool) {
        Database.pool = new Pool({
          connectionString: env.DATABASE_URL,
        });
      }

      const adapter = new PrismaPg(Database.pool);

      Database.instance = new PrismaClient({
        adapter: adapter,
        log: [
          {level: 'query', emit: 'event'},
          {level: 'error', emit: 'event'},
          {level: 'warn', emit: 'event'},
        ],
      });

      Database.instance.$on('error' as never, (e: unknown) => {
        logger.error('Prisma Error', {error: e});
      });

      Database.instance.$on('warn' as never, (e: unknown) => {
        logger.warn('Prisma Warning', {warning: e});
      });
    }

    return Database.instance;
  }

  public static async connect(): Promise<void> {
    if (Database.isConnected) {
      return;
    }

    try {
      await Database.getInstance().$connect();
      Database.isConnected = true;
      logger.info('Database connected successfully');
    } catch (error) {
      logger.error('Database connection failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  public static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
      Database.isConnected = false;
      logger.info('Database disconnected');
    }
    if (Database.pool) {
      await Database.pool.end();
      Database.pool = null;
    }
  }
}

export default Database;
