/** @format */

import {Router, Request, Response, NextFunction} from 'express';
import awilixConfig from '@utils/configs/container';
import {IContainerCradle} from '@utils/configs/container.types';

class AuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/login', this.login.bind(this));
    this.router.get('/profile', this.profile.bind(this));
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {authController, validation, loginSchema} = cradle;

    const validationMiddleware = validation.validate(loginSchema);
    validationMiddleware(req, res, async (err?: any) => {
      if (err) return next(err);
      await authController.login(req, res, next);
    });
  };

  private profile = async (req: Request, res: Response, next: NextFunction) => {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {authController, authMiddleware} = cradle;

    const authMiddlewareFn = authMiddleware.authenticate();
    authMiddlewareFn(req, res, async (err?: any) => {
      if (err) return next(err);
      await authController.getProfile(req, res, next);
    });
  };

  public getRouter(): Router {
    return this.router;
  }
}

export default new AuthRouter().getRouter();
