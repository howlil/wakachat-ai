/** @format */

import {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
  Lifetime,
} from 'awilix';
import path from 'path';

import env from './env';
import logger from './logger';
import Database from './database';
import response from '../api/response';
import validation from './validation';
import {IContainerCradle} from './container.types';

// Import validation schemas
import {loginSchema} from '../../validations/auth.validation';

class AwilixConfig {
  private container = createContainer<IContainerCradle>({
    injectionMode: InjectionMode.PROXY,
  });

  constructor() {
    this.registerCore();
    this.loadModules();
  }

  /**
   * Register core dependencies (singleton values)
   */
  private registerCore(): void {
    this.container.register({
      env: asValue(env),
      logger: asValue(logger),
      database: asValue(Database),
      response: asValue(response),
      validation: asValue(validation),
      // Register validation schemas
      loginSchema: asValue(loginSchema),
    });
  }

  private loadModules(): void {
    const appPath = path.join(__dirname, '../..');

    try {
      // Load Middlewares (SINGLETON) - auto-register semua *Middleware classes
      this.container.loadModules(
        [
          `${appPath}/middlewares/**/*.middleware.{ts,js}`,
          `${appPath}/dist/app/middlewares/**/*.middleware.js`, // For production
        ],
        {
          formatName: 'camelCase', // AuthMiddleware -> authMiddleware
          resolverOptions: {
            lifetime: Lifetime.SINGLETON,
            injector: (cradle: any) => ({
              logger: cradle.logger,
              response: cradle.response,
              authService: cradle.authService,
              env: cradle.env,
            }),
          },
        }
      );

      this.registerServices();
      this.registerControllers();
      this.registerAdditionalMiddlewares();

      // Log registered modules
      const registrations = Object.keys(this.container.registrations);
      logger.info('🔧 Awilix modules auto-loaded:', {
        total: registrations.length,
        services: registrations.filter((key) => key.endsWith('Service')),
        controllers: registrations.filter((key) => key.endsWith('Controller')),
        middlewares: registrations.filter(
          (key) =>
            key.endsWith('Middleware') ||
            key === 'security' ||
            key === 'errorHandler' ||
            key === 'httpLogger'
        ),
      });
    } catch (error) {
      logger.warn('Some modules failed to load, using fallback registration', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      this.fallbackRegistration();
    }
  }

  private registerServices(): void {
    const AuthService = require('@services/auth.service').default;

    const container = this.container;

    this.container.register({
      authService: asFunction(() => {
        const database = container.resolve('database');
        const logger = container.resolve('logger');
        const env = container.resolve('env');
        return new AuthService({database, logger, env});
      }).singleton() as any,
    });
  }

  private registerControllers(): void {
    const AuthController = require('@controllers/auth.controller').default;

    const container = this.container;

    this.container.register({
      authController: asFunction(() => {
        const authService = container.resolve('authService');
        const response = container.resolve('response');
        const logger = container.resolve('logger');
        return new AuthController({authService, response, logger});
      }).scoped() as any,
    });
  }

  private registerAdditionalMiddlewares(): void {
    const ErrorHandler = require('@middlewares/errorHandler').default;
    const HttpLogger = require('@middlewares/httpLogger').default;
    const SecurityMiddleware = require('@middlewares/security').default;

    const container = this.container;

    this.container.register({
      errorHandler: asFunction(() => {
        const logger = container.resolve('logger');
        const env = container.resolve('env');
        return new ErrorHandler({logger, env});
      }).singleton() as any,
      httpLogger: asFunction(() => {
        const logger = container.resolve('logger');
        return new HttpLogger({logger});
      }).singleton() as any,
      security: asFunction(() => {
        const env = container.resolve('env');
        return new SecurityMiddleware({env});
      }).singleton() as any,
    });
  }

  private fallbackRegistration(): void {
    const AuthService = require('@services/auth.service').default;
    const AuthController = require('@controllers/auth.controller').default;
    const ErrorHandler = require('@middlewares/errorHandler').default;
    const HttpLogger = require('@middlewares/httpLogger').default;
    const SecurityMiddleware = require('@middlewares/security').default;
    const AuthMiddleware = require('@middlewares/auth.middleware').default;

    const container = this.container;

    this.container.register({
      authService: asFunction(() => {
        const database = container.resolve('database');
        const logger = container.resolve('logger');
        const env = container.resolve('env');
        return new AuthService({database, logger, env});
      }).singleton() as any,
      authController: asFunction(() => {
        const authService = container.resolve('authService');
        const response = container.resolve('response');
        const logger = container.resolve('logger');
        return new AuthController({authService, response, logger});
      }).scoped() as any,
      errorHandler: asFunction(() => {
        const logger = container.resolve('logger');
        const env = container.resolve('env');
        return new ErrorHandler({logger, env});
      }).singleton() as any,
      httpLogger: asFunction(() => {
        const logger = container.resolve('logger');
        return new HttpLogger({logger});
      }).singleton() as any,
      security: asFunction(() => {
        const env = container.resolve('env');
        return new SecurityMiddleware({env});
      }).singleton() as any,
      authMiddleware: asFunction(() => {
        const authService = container.resolve('authService');
        const response = container.resolve('response');
        const logger = container.resolve('logger');
        return new AuthMiddleware({authService, response, logger});
      }).singleton() as any,
    } as any);

    logger.info('🔧 Fallback registration completed');
  }

  public get instance() {
    return this.container;
  }

  public get scope() {
    return this.container.createScope();
  }
}

const awilixConfig = new AwilixConfig();

export default awilixConfig;
