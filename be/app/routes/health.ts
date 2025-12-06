/** @format */

import {Router, Request, Response} from 'express';
import awilixConfig from '@utils/configs/container';
import {IContainerCradle} from '@utils/configs/container.types';

class HealthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/health', this.checkHealth.bind(this));
  }

  private async checkHealth(req: Request, res: Response): Promise<void> {
    const cradle: IContainerCradle = awilixConfig.instance.cradle;
    const {response} = cradle;
    response.success(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }


  public getRouter(): Router {
    return this.router;
  }
}

export default new HealthRouter().getRouter();
