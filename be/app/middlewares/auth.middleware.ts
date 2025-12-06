/** @format */

import {Request, Response, NextFunction} from 'express';
import type {IContainerCradle} from '@utils/configs/container.types';
import {Role} from '@prisma/client';

interface IAuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: Role;
  };
}

class AuthMiddleware {
  private authService: IContainerCradle['authService'];
  private response: IContainerCradle['response'];
  private logger: IContainerCradle['logger'];

  constructor(deps: {
    authService: IContainerCradle['authService'];
    response: IContainerCradle['response'];
    logger: IContainerCradle['logger'];
  }) {
    this.authService = deps.authService;
    this.response = deps.response;
    this.logger = deps.logger;
  }

  public authenticate() {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return this.response.error(res, 'No token provided', 401);
        }

        const token = authHeader.substring(7);

        const payload = this.authService.verifyToken(token);

        req.user = {
          userId: payload.userId,
          email: payload.email,
          role: payload.role,
        };

        // Set user context for logging
        this.logger.setContext({
          userId: payload.userId,
          email: payload.email,
          role: payload.role,
        });

        next();
      } catch (error) {
        this.logger.warn('Authentication failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
          path: req.path,
        });
        return this.response.error(res, 'Invalid or expired token', 401);
      }
    };
  }

  /**
   * Check if user has required role
   */
  public authorize(...allowedRoles: Role[]) {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
      if (!req.user) {
        return this.response.error(res, 'User not authenticated', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        this.logger.warn('Authorization failed', {
          userId: req.user.userId,
          role: req.user.role,
          requiredRoles: allowedRoles,
          path: req.path,
        });
        return this.response.error(res, 'Insufficient permissions', 403);
      }

      next();
    };
  }
}

export default AuthMiddleware;
