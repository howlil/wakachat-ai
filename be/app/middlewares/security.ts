/** @format */

import cors from 'cors';
import type {IContainerCradle} from '@utils/configs/container.types';

class SecurityMiddleware {
  private env: IContainerCradle['env'];

  constructor(deps: {env: IContainerCradle['env']}) {
    this.env = deps.env;
  }

  public cors() {
    if (this.env.isDevelopment()) {
      return cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Trace-Id',
          'X-Request-Id',
        ],
      });
    }

    const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [];

    return cors({
      origin: (origin, callback) => {
        if (!origin) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Trace-Id',
        'X-Request-Id',
      ],
    });
  }
}

export default SecurityMiddleware;
