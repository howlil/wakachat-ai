/** @format */

import 'dotenv/config';
import express from 'express';
import {scopePerRequest} from 'awilix-express';
import awilixConfig from '@utils/configs/container';
import {IContainerCradle} from '@utils/configs/container.types';

class StartServer {
  private app: express.Application;
  private port: number;

  constructor() {
    try {
      this.app = express();
      const cradle: IContainerCradle = awilixConfig.instance.cradle;
      this.port = cradle.env.PORT;

      this.setupAwilix();
      this.setupMiddleware();
      this.setupRoutes();
      this.setupErrorHandling();
    } catch (error) {
      throw error;
    }
  }

  private setupAwilix(): void {
    this.app.use(scopePerRequest(awilixConfig.instance));
  }

  private setupMiddleware(): void {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {security, httpLogger} = cradle;

    this.app.use(security.cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(httpLogger.middleware());
  }

  private setupRoutes(): void {
    const healthRouter = require('@routes/health').default;
    const authRouter = require('@routes/auth.route').default;

    this.app.use('/api', healthRouter);
    this.app.use('/api/auth', authRouter);
  }

  private setupErrorHandling(): void {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {errorHandler} = cradle;

    this.app.use(errorHandler.notFound());
    this.app.use(errorHandler.handle());
  }

  public async listen(): Promise<void> {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {database, logger, env} = cradle;

    try {
      logger.info('Connecting to database...');
      await database.connect();

      this.app.listen(this.port, () => {
        logger.info('Server started successfully', {
          environment: env.NODE_ENV,
          port: this.port,
        });
      });
    } catch (error) {
      logger.error('Failed to start server', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      process.exit(1);
    }
  }

  public async shutdown(): Promise<void> {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {database, logger} = cradle;

    logger.info('Shutting down server...');
    await database.disconnect();
    process.exit(0);
  }
}

try {
  const server = new StartServer();
  server.listen().catch((error) => {
    process.exit(1);
  });

  process.on('SIGTERM', () => server.shutdown());
  process.on('SIGINT', () => server.shutdown());
} catch (error) {
  console.error('Failed to initialize server:', error);
  process.exit(1);
}
