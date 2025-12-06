/** @format */

import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import type {IContainerCradle} from '@utils/configs/container.types';
import {Role} from '@prisma/client';

interface ILoginCredentials {
  email: string;
  password: string;
}

interface ITokenPayload {
  userId: string;
  email: string;
  role: Role;
}

class AuthService {
  private readonly prisma: ReturnType<
    typeof import('@utils/configs/database').default.getInstance
  >;
  private readonly logger: IContainerCradle['logger'];
  private readonly env: IContainerCradle['env'];

  constructor(deps: {
    database: IContainerCradle['database'];
    logger: IContainerCradle['logger'];
    env: IContainerCradle['env'];
  }) {
    this.prisma = deps.database.getInstance();
    this.logger = deps.logger;
    this.env = deps.env;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(payload: ITokenPayload): string {
    const secret = this.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign(payload, secret, {
      expiresIn: (this.env.JWT_EXPIRES_IN || '7d') as string,
    } as jwt.SignOptions);
  }

  public verifyToken(token: string): ITokenPayload {
    if (!this.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    try {
      return jwt.verify(token, this.env.JWT_SECRET) as ITokenPayload;
    } catch (error) {
      this.logger.warn('Token verification failed', {error});
      throw new Error('Invalid or expired token');
    }
  }

  public async login(credentials: ILoginCredentials) {
    const {email, password} = credentials;

    const user = await this.prisma.user.findUnique({
      where: {email: email.toLowerCase()},
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const {password: _, ...userWithoutPassword} = user;

    this.logger.info('User logged in', {
      userId: user.id,
      email: user.email,
    });

    return {
      user: userWithoutPassword,
      token,
    };
  }

  public async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {id: userId},
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default AuthService;
