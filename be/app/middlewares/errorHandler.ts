/** @format */

import {Request, Response, NextFunction} from 'express';
import type {IContainerCradle} from '@utils/configs/container.types';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

class ErrorHandler {
  private logger: IContainerCradle['logger'];
  private env: IContainerCradle['env'];

  constructor(deps: {
    logger: IContainerCradle['logger'];
    env: IContainerCradle['env'];
  }) {
    this.logger = deps.logger;
    this.env = deps.env;
  }

  public handle() {
    return (
      err: CustomError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if ((err as any).code === 'P2002') {
        err.message = 'Duplicate entry. This record already exists.';
        err.statusCode = 409;
      } else if ((err as any).code === 'P2025') {
        err.message = 'Record not found.';
        err.statusCode = 404;
      }

      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
      const errorCode = (err as any).code || undefined;

      if (statusCode >= 500) {
        this.logger.error('Error occurred', err, {
          statusCode,
          path: req.path,
          method: req.method,
          url: req.originalUrl,
          stack: err.stack,
        });
      } else {
        this.logger.warn('Client error', {
          error: message,
          statusCode,
          path: req.path,
          method: req.method,
          url: req.originalUrl,
          code: errorCode,
        });
      }

      const response: {
        success: boolean;
        error: string;
        code?: string;
      } = {
        success: false,
        error: message,
      };

      if (errorCode) {
        response.code = errorCode;
      }

      res.status(statusCode).json(response);
    };
  }

  public notFound() {
    return (req: Request, res: Response, next: NextFunction) => {
      const error: CustomError = new Error(
        `Route ${req.originalUrl} not found`
      );
      error.statusCode = 404;
      next(error);
    };
  }
}

export default ErrorHandler;
