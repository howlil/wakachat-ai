/** @format */

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

interface ILoggerConfig {
  logLevel?: string;
  logDir?: string;
  maxSize?: string;
  maxFiles?: string;
  errorMaxFiles?: string;
  serviceName?: string;
  enableCompression?: boolean;
  enableSampling?: boolean;
  sampleRate?: number;
}

interface ILogContext {
  traceId?: string;
  spanId?: string;
  userId?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: any;
}

class Logger {
  private logger: winston.Logger;
  private config: Required<ILoggerConfig>;
  private context: ILogContext = {};
  private sensitiveKeys: Set<string> = new Set([
    'password',
    'token',
    'secret',
    'apiKey',
    'authorization',
    'auth',
    'accessToken',
    'refreshToken',
    'api_key',
    'apikey',
    'privateKey',
    'private_key',
    'creditCard',
    'credit_card',
    'cvv',
    'ssn',
  ]);

  constructor(config: ILoggerConfig = {}) {
    this.config = {
      logLevel: config.logLevel || process.env.LOG_LEVEL || 'info',
      logDir: config.logDir || path.join(process.cwd(), 'logs'),
      maxSize: config.maxSize || '20m',
      maxFiles: config.maxFiles || '14d',
      errorMaxFiles: config.errorMaxFiles || '30d',
      serviceName: config.serviceName || 'omnichannel-wa',
      enableCompression: config.enableCompression ?? true,
      enableSampling: config.enableSampling ?? false,
      sampleRate: config.sampleRate || 0.1,
    };

    this.logger = this.createLogger();
  }

  private createLogger(): winston.Logger {
    const logFormat = this.getLogFormat();
    const consoleFormat = this.getConsoleFormat();

    const transports: winston.transport[] = [
      this.createFileTransport(logFormat),
      this.createErrorFileTransport(logFormat),
    ];

    if (
      process.env.NODE_ENV !== 'production' ||
      process.env.ENABLE_CONSOLE_LOG === 'true'
    ) {
      transports.push(
        new winston.transports.Console({
          format: consoleFormat,
        })
      );
    }

    return winston.createLogger({
      level: this.config.logLevel,
      format: logFormat,
      defaultMeta: {
        service: this.config.serviceName,
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0',
      },
      transports,
      exceptionHandlers: [this.createExceptionTransport()],
      rejectionHandlers: [this.createRejectionTransport()],
    });
  }

  private getLogFormat() {
    return winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'}),
      winston.format.errors({stack: true}),
      winston.format.splat(),
      winston.format((info) => {
        // Add trace ID if not present
        if (!info.traceId && this.context.traceId) {
          info.traceId = this.context.traceId;
        }
        // Add span ID if not present
        if (!info.spanId && this.context.spanId) {
          info.spanId = this.context.spanId;
        }
        // Merge context
        if (Object.keys(this.context).length > 0) {
          info.context = {...this.context};
        }
        return info;
      })(),
      winston.format.json()
    );
  }

  private getConsoleFormat() {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
      winston.format.printf(
        ({timestamp, level, message, traceId, spanId, ...meta}) => {
          let msg = `${timestamp} [${level}]`;

          // Add trace ID for easy tracking
          if (traceId && typeof traceId === 'string') {
            msg += ` [trace:${traceId.substring(0, 8)}]`;
          }
          if (spanId && typeof spanId === 'string') {
            msg += ` [span:${spanId.substring(0, 8)}]`;
          }

          msg += `: ${message}`;

          // Format meta data
          const cleanMeta = this.sanitizeData(meta);
          if (Object.keys(cleanMeta).length > 0) {
            msg += ` ${JSON.stringify(cleanMeta, null, 2)}`;
          }

          return msg;
        }
      )
    );
  }

  private createFileTransport(format: winston.Logform.Format) {
    return new DailyRotateFile({
      filename: path.join(this.config.logDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: this.config.maxSize,
      maxFiles: this.config.maxFiles,
      format,
      zippedArchive: this.config.enableCompression,
      createSymlink: true,
      symlinkName: 'current-application.log',
    });
  }

  private createErrorFileTransport(format: winston.Logform.Format) {
    return new DailyRotateFile({
      filename: path.join(this.config.logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: this.config.maxSize,
      maxFiles: this.config.errorMaxFiles,
      level: 'error',
      format,
      zippedArchive: this.config.enableCompression,
      createSymlink: true,
      symlinkName: 'current-error.log',
    });
  }

  private createExceptionTransport() {
    return new DailyRotateFile({
      filename: path.join(this.config.logDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: this.config.maxSize,
      maxFiles: this.config.errorMaxFiles,
      zippedArchive: this.config.enableCompression,
      createSymlink: true,
      symlinkName: 'current-exceptions.log',
    });
  }

  private createRejectionTransport() {
    return new DailyRotateFile({
      filename: path.join(this.config.logDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: this.config.maxSize,
      maxFiles: this.config.errorMaxFiles,
      zippedArchive: this.config.enableCompression,
      createSymlink: true,
      symlinkName: 'current-rejections.log',
    });
  }

  /**
   * Sanitize sensitive data from log metadata
   */
  private sanitizeData(data: Record<string, any>): Record<string, any> {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();

      // Check if key is sensitive
      if (this.sensitiveKeys.has(lowerKey)) {
        sanitized[key] = '[REDACTED]';
        continue;
      }

      // Recursively sanitize nested objects
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        sanitized[key] = this.sanitizeData(value);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map((item) =>
          typeof item === 'object' ? this.sanitizeData(item) : item
        );
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Set context for all subsequent logs (trace ID, user ID, etc.)
   */
  public setContext(context: ILogContext): void {
    this.context = {...this.context, ...context};
  }

  /**
   * Clear context
   */
  public clearContext(): void {
    this.context = {};
  }

  /**
   * Get current context
   */
  public getContext(): ILogContext {
    return {...this.context};
  }

  /**
   * Create child logger with additional context
   */
  public child(additionalContext: ILogContext): Logger {
    const childLogger = new Logger(this.config);
    childLogger.setContext({...this.context, ...additionalContext});
    return childLogger;
  }

  /**
   * Generate new trace ID
   */
  public generateTraceId(): string {
    return uuidv4();
  }

  /**
   * Generate new span ID
   */
  public generateSpanId(): string {
    return uuidv4();
  }

  /**
   * Start a new trace context
   */
  public startTrace(traceId?: string): string {
    const id = traceId || this.generateTraceId();
    this.setContext({
      traceId: id,
      spanId: this.generateSpanId(),
    });
    return id;
  }

  /**
   * Log with sampling for high-volume logs
   */
  private shouldLog(level: string): boolean {
    if (!this.config.enableSampling) {
      return true;
    }

    // Always log errors and warnings
    if (level === 'error' || level === 'warn') {
      return true;
    }

    // Sample debug and verbose logs
    if (level === 'debug' || level === 'verbose') {
      return Math.random() < this.config.sampleRate;
    }

    return true;
  }

  /**
   * Enhanced info logging
   */
  public info(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('info')) return;
    const sanitized = meta ? this.sanitizeData(meta) : undefined;
    this.logger.info(message, sanitized);
  }

  /**
   * Enhanced error logging with error object support
   */
  public error(
    message: string,
    error?: Error | Record<string, any>,
    meta?: Record<string, any>
  ): void {
    let errorMeta: Record<string, any> = {};

    if (error instanceof Error) {
      errorMeta = {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          ...((error as any).code && {code: (error as any).code}),
        },
      };
    } else if (error && typeof error === 'object') {
      errorMeta = error;
    }

    const mergedMeta = {...errorMeta, ...meta};
    const sanitized = this.sanitizeData(mergedMeta);
    this.logger.error(message, sanitized);
  }

  /**
   * Enhanced warn logging
   */
  public warn(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('warn')) return;
    const sanitized = meta ? this.sanitizeData(meta) : undefined;
    this.logger.warn(message, sanitized);
  }

  /**
   * Enhanced debug logging with sampling
   */
  public debug(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('debug')) return;
    const sanitized = meta ? this.sanitizeData(meta) : undefined;
    this.logger.debug(message, sanitized);
  }

  /**
   * Enhanced verbose logging with sampling
   */
  public verbose(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('verbose')) return;
    const sanitized = meta ? this.sanitizeData(meta) : undefined;
    this.logger.verbose(message, sanitized);
  }

  /**
   * Performance timing helper
   */
  public time(label: string): void {
    console.time(label);
  }

  public timeEnd(label: string): void {
    console.timeEnd(label);
  }

  /**
   * Log performance metrics
   */
  public performance(
    operation: string,
    duration: number,
    meta?: Record<string, any>
  ): void {
    this.info(`Performance: ${operation}`, {
      ...meta,
      duration: `${duration}ms`,
      operation,
      type: 'performance',
    });
  }

  /**
   * HTTP request logging
   */
  public http(message: string, meta?: Record<string, any>): void {
    this.info(message, {
      ...meta,
      type: 'http',
    });
  }

  public db(message: string, meta?: Record<string, any>): void {
    this.debug(message, {
      ...meta,
      type: 'database',
    });
  }

  /**
   * Audit logging for security events
   */
  public audit(message: string, meta?: Record<string, any>): void {
    this.info(message, {
      ...meta,
      type: 'audit',
      timestamp: new Date().toISOString(),
    });
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }
}

const logger = new Logger();
export default logger;
