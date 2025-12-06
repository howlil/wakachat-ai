/** @format */

import AuthService from '@services/auth.service';
import AuthController from '@controllers/auth.controller';
import ErrorHandler from '@middlewares/errorHandler';
import HttpLogger from '@middlewares/httpLogger';
import SecurityMiddleware from '@middlewares/security';
import AuthMiddleware from '@middlewares/auth.middleware';
import Database from './database';
import logger from './logger';
import env from './env';
import response from '../api/response';
import validation from './validation';

export interface IContainerCradle {
  // Core configs
  env: typeof env;
  logger: typeof logger;
  database: typeof Database;
  response: typeof response;
  validation: typeof validation;

  // Services
  authService: AuthService;

  // Controllers
  authController: AuthController;

  // Middlewares
  errorHandler: ErrorHandler;
  httpLogger: HttpLogger;
  security: SecurityMiddleware;
  authMiddleware: AuthMiddleware;

  // Validation Schemas
  loginSchema: {
    body: import('zod').ZodObject<{
      email: import('zod').ZodString;
      password: import('zod').ZodString;
    }>;
  };
}
