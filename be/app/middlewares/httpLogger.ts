/** @format */

import {Request, Response, NextFunction} from 'express';
import type {IContainerCradle} from '@utils/configs/container.types';

interface IRequestMeta {
  method: string;
  url: string;
  ip?: string;
  userAgent?: string;
  statusCode?: number;
  duration?: string;
  requestId?: string;
}

class HttpLogger {
  private logger: IContainerCradle['logger'];

  constructor(deps: {logger: IContainerCradle['logger']}) {
    this.logger = deps.logger;
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();

      // Generate or use existing trace ID from headers
      const traceId =
        (req.headers['x-trace-id'] as string) ||
        (req.headers['x-request-id'] as string) ||
        this.logger.generateTraceId();

      // Set trace context for this request
      this.logger.setContext({
        traceId,
        spanId: this.logger.generateSpanId(),
        requestId: traceId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        method: req.method,
        url: req.url,
        userId: (req as any).user?.id,
      });

      // Add trace ID to response headers for distributed tracing
      res.setHeader('X-Trace-Id', traceId);
      res.setHeader('X-Request-Id', traceId);

      this.logRequest(req, traceId);

      const originalEnd = res.end;
      const self = this;
      res.end = function (chunk?: any, encoding?: any, cb?: () => void) {
        const duration = Date.now() - start;
        self.logResponse(req, res, duration, traceId);
        if (typeof encoding === 'function') {
          cb = encoding as () => void;
          encoding = undefined;
        }
        return originalEnd.call(this, chunk, encoding, cb);
      };

      next();
    };
  }

  private logRequest(req: Request, traceId: string): void {
    const meta: IRequestMeta = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      requestId: traceId,
    };

    this.logger.http('Incoming Request', meta);
  }

  private logResponse(
    req: Request,
    res: Response,
    duration: number,
    traceId: string
  ): void {
    const meta: IRequestMeta = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      requestId: traceId,
    };

    if (res.statusCode >= 500) {
      this.logger.error('Outgoing Response', meta);
    } else if (res.statusCode >= 400) {
      this.logger.warn('Outgoing Response', meta);
    } else {
      this.logger.http('Outgoing Response', meta);
    }

    // Log performance for slow requests
    if (duration > 1000) {
      this.logger.performance(`${req.method} ${req.url}`, duration, {
        statusCode: res.statusCode,
        traceId,
      });
    }
  }
}

export default HttpLogger;
