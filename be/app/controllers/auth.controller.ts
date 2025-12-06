/** @format */

import {Request, Response, NextFunction} from 'express';
import type {IContainerCradle} from '@utils/configs/container.types';

class AuthController {
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

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email, password} = req.body;

      const result = await this.authService.login({email, password});

      this.response.success(res, result, 'Login successful');
    } catch (error) {
      this.logger.error('Login failed', error as Error, {
        email: req.body.email,
      });
      next(error);
    }
  };

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return this.response.error(res, 'User not authenticated', 401);
      }

      const user = await this.authService.getUserById(userId);
      this.response.success(res, user, 'Profile retrieved successfully');
    } catch (error) {
      this.logger.error('Get profile failed', error as Error);
      next(error);
    }
  };
}

export default AuthController;
