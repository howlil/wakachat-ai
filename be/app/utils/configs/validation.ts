/** @format */

import {Request, Response, NextFunction} from 'express';
import {z, ZodError, ZodSchema, ZodTypeAny} from 'zod';
import response from '@utils/api/response';
import logger from '@utils/configs/logger';

interface ValidationTarget {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

class Validation {
  public validate(schema: ValidationTarget) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schema.body) {
          req.body = schema.body.parse(req.body) as typeof req.body;
        }

        if (schema.query) {
          const parsed = schema.query.parse(req.query);
          req.query = parsed as typeof req.query;
        }

        if (schema.params) {
          const parsed = schema.params.parse(req.params);
          req.params = parsed as typeof req.params;
        }

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = this.formatZodError(error);

          logger.warn('Validation failed', {
            errors: errorMessages,
            path: req.path,
            method: req.method,
          });

          response.error(res, errorMessages[0], 400);
        } else {
          next(error);
        }
      }
    };
  }

  public body(schema: ZodSchema) {
    return this.validate({body: schema});
  }

  public query(schema: ZodSchema) {
    return this.validate({query: schema});
  }

  public params(schema: ZodSchema) {
    return this.validate({params: schema});
  }

  private formatZodError(error: ZodError): string[] {
    return error.issues.map((err) => {
      const path = err.path.join('.');
      return path ? `${path}: ${err.message}` : err.message;
    });
  }
}

export default new Validation();
