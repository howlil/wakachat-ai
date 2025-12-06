/** @format */

class EnvConfig {
  public readonly NODE_ENV: string;
  public readonly PORT: number;
  public readonly DATABASE_URL: string;
  public readonly LOG_LEVEL: string;
  public readonly JWT_SECRET?: string;
  public readonly JWT_EXPIRES_IN?: string;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.PORT = Number(process.env.PORT) || 3001;
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

    this.validate();
  }

  private validate(): void {
    if (!this.DATABASE_URL) {
      throw new Error('DATABASE_URL is required');
    }
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }
  }

  public isDevelopment(): boolean {
    return this.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.NODE_ENV === 'production';
  }
}

export default new EnvConfig();
