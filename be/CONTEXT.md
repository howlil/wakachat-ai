<!-- @format -->

# Backend Application Context

## Architecture Overview

Express.js + TypeScript monolith dengan Dependency Injection menggunakan Awilix. Mengikuti prinsip YAGNI, clean code, dan iterasi cepat tanpa over-engineering.

## Core Principles

### 1. Dependency Injection (Awilix)

- **100% DI**: Semua dependency di-resolve dari container, tidak ada import langsung ke internal modules
- **Type-safe**: Menggunakan `IContainerCradle` untuk type definitions
- **Auto-registration**: `loadModules` untuk auto-register services, controllers, middlewares berdasarkan naming convention
- **Lifetime Management**:
  - Services: `SINGLETON`
  - Controllers: `SCOPED` (per request)
  - Middlewares: `SINGLETON`

### 2. File Structure

```
app/
├── controllers/     # Request handlers, thin layer
├── services/        # Business logic
├── middlewares/     # HTTP middleware
├── routes/          # Route definitions
├── validations/     # Zod schemas
└── utils/
    ├── api/         # API utilities (response formatter)
    └── configs/     # Core configs (container, database, logger, env, validation)
```

### 3. Naming Conventions

- **Services**: `*.service.ts` → auto-register sebagai `camelCase` (AuthService → authService)
- **Controllers**: `*.controller.ts` → auto-register sebagai `camelCase` (AuthController → authController)
- **Middlewares**: `*.middleware.ts` → auto-register sebagai `camelCase` (AuthMiddleware → authMiddleware)
- **Routes**: `*.route.ts` atau `*.ts` di routes folder
- **Validations**: `*.validation.ts` di validations folder

## Code Patterns

### Service Pattern

```typescript
import type {IContainerCradle} from '@utils/configs/container.types';
import {Role} from '@prisma/client';

interface ILoginCredentials {
  email: string;
  password: string;
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

  public async login(credentials: ILoginCredentials) {
    // Business logic here
  }
}

export default AuthService;
```

**Rules:**

- Private methods untuk internal logic
- Public methods untuk API
- Throw Error untuk error handling (tidak return error object)
- Use `this.logger` untuk logging
- Use `this.prisma` untuk database operations

### Controller Pattern

```typescript
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
}

export default AuthController;
```

**Rules:**

- Thin layer: hanya handle HTTP request/response
- Delegate business logic ke service
- Use `this.response.success()` atau `this.response.error()` untuk response
- Use `this.logger` untuk logging
- Always use arrow functions untuk methods
- Pass error ke `next()` untuk error handler middleware

### Middleware Pattern

```typescript
import {Request, Response, NextFunction} from 'express';
import type {IContainerCradle} from '@utils/configs/container.types';

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
      // Middleware logic
    };
  }
}

export default AuthMiddleware;
```

**Rules:**

- Return function yang return middleware function
- Use `this.response.error()` untuk error response
- Use `this.logger` untuk logging
- Call `next()` untuk continue, atau return response untuk stop

### Route Pattern

```typescript
import {Router} from 'express';
import awilixConfig from '@utils/configs/container';
import {IContainerCradle} from '@utils/configs/container.types';

class AuthRouter {
  private router: Router;
  private cradle: IContainerCradle;

  constructor() {
    this.router = Router();
    this.cradle = awilixConfig.instance.cradle;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const {authController, authMiddleware, validation, loginSchema} =
      this.cradle;

    this.router.post(
      '/login',
      validation.validate(loginSchema),
      authController.login.bind(authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AuthRouter().getRouter();
```

**Rules:**

- Resolve semua dependencies dari container
- Use `validation.validate()` untuk input validation
- Use `.bind()` untuk controller methods
- Export router instance, bukan class

### Validation Pattern

```typescript
import {z} from 'zod';

export const loginSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
};
```

**Rules:**

- Export object dengan `body`, `query`, atau `params` property
- Use Zod for validation
- Register schema di container untuk DI
- Validation middleware auto-handle error response

## Dependency Injection Rules

### 1. No Direct Imports

**❌ WRONG:**

```typescript
import AuthService from '@services/auth.service';
import logger from '@utils/configs/logger';
```

**✅ CORRECT:**

```typescript
import type {IContainerCradle} from '@utils/configs/container.types';

class AuthController {
  private authService: IContainerCradle['authService'];
  private logger: IContainerCradle['logger'];

  constructor(deps: {
    authService: IContainerCradle['authService'];
    logger: IContainerCradle['logger'];
  }) {
    this.authService = deps.authService;
    this.logger = deps.logger;
  }
}
```

### 2. Type Definitions

- Use `IContainerCradle['key']` untuk type dari container
- Use `import type` untuk type-only imports (tidak di-bundle)
- External libraries (express, prisma, zod) boleh import langsung

### 3. Container Registration

- Core configs: Register di `registerCore()` dengan `asValue()`
- Services: Auto-register via `loadModules()` dengan `SINGLETON` lifetime
- Controllers: Auto-register via `loadModules()` dengan `SCOPED` lifetime
- Middlewares: Auto-register via `loadModules()` dengan `SINGLETON` lifetime
- Routes: Register di `registerRoutes()` dengan `asFunction()`
- Validation schemas: Register di `registerCore()` dengan `asValue()`

## Error Handling

### Service Layer

```typescript
if (!user) {
  throw new Error('Invalid email or password');
}
```

### Controller Layer

```typescript
try {
  const result = await this.authService.login({email, password});
  this.response.success(res, result, 'Login successful');
} catch (error) {
  this.logger.error('Login failed', error as Error);
  next(error);
}
```

### Error Handler Middleware

- Auto-catch errors dari controllers
- Handle Prisma errors (P2002, P2025)
- Format error response
- Log errors dengan context

## Logging

### Logger Usage

```typescript
this.logger.info('User logged in', {userId: user.id, email: user.email});
this.logger.error('Login failed', error as Error, {email: req.body.email});
this.logger.warn('Authentication failed', {path: req.path});
this.logger.http('Incoming Request', {method: req.method, url: req.url});
this.logger.performance('Slow query', duration, {query: 'SELECT * FROM users'});
```

### Context Setting

```typescript
this.logger.setContext({
  traceId: 'xxx',
  userId: 'xxx',
  email: 'xxx',
});
```

## Response Format

### Success Response

```typescript
this.response.success(res, data, 'Message', 200);
```

### Error Response

```typescript
this.response.error(res, 'Error message', 400);
```

### Paginated Response

```typescript
this.response.paginated(res, data, {page: 1, limit: 10, total: 100}, 'Message');
```

## Database

### Prisma Pattern

- Use `Database.getInstance()` untuk PrismaClient
- Singleton pattern untuk connection
- Use Prisma 7 dengan adapter pattern
- Connection pool via `pg` Pool

### Query Pattern

```typescript
const user = await this.prisma.user.findUnique({
  where: {id: userId},
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

## Environment Variables

### Required

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT secret key
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3001)

### Optional

- `LOG_LEVEL`: Log level (default: info)
- `JWT_EXPIRES_IN`: JWT expiration (default: 7d)
- `FRONTEND_URL`: CORS allowed origins

## Code Style

### General Rules

- **No comments**: Code should be self-documenting
- **Clean code**: Follow industry standards
- **YAGNI**: Don't add features until needed
- **Iteration speed**: Fast iteration, simple solutions
- **Type safety**: Use TypeScript strictly
- **Consistent naming**: camelCase for variables, PascalCase for classes

### File Format

- First line: `/** @format */`
- Use 2 spaces for indentation
- No trailing commas unless needed
- Export default class, not instance (except routes)

### Import Order

1. External libraries (express, prisma, zod)
2. Type imports (`import type`)
3. Internal types (`IContainerCradle`)
4. Container config

## Testing Considerations

- Services: Easy to mock via DI
- Controllers: Test with mocked services
- Middlewares: Test with mocked dependencies
- All dependencies injectable = testable

## Adding New Features

### 1. New Service

- Create `app/services/feature.service.ts`
- Export class (not instance)
- Auto-registered via `loadModules()`
- Inject dependencies via constructor

### 2. New Controller

- Create `app/controllers/feature.controller.ts`
- Export class (not instance)
- Auto-registered via `loadModules()`
- Inject services via constructor

### 3. New Route

- Create `app/routes/feature.route.ts`
- Export router instance
- Register in `container.ts` → `registerRoutes()`
- Resolve dependencies from container

### 4. New Middleware

- Create `app/middlewares/feature.middleware.ts`
- Export class (not instance)
- Auto-registered via `loadModules()`
- Inject dependencies via constructor

### 5. New Validation Schema

- Create `app/validations/feature.validation.ts`
- Export schema object
- Register in `container.ts` → `registerCore()`
- Use in routes via container

## Common Patterns

### Authentication Flow

1. Request → Route → Validation → Controller
2. Controller → Service (business logic)
3. Service → Database (Prisma)
4. Service → Logger (logging)
5. Controller → Response (format response)

### Error Flow

1. Service throws Error
2. Controller catches → next(error)
3. Error Handler middleware formats response
4. Logger logs error with context

### Dependency Flow

1. Container registers all dependencies
2. Routes resolve from container
3. Controllers resolve from container
4. Services resolve from container
5. All type-safe via `IContainerCradle`

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Language**: TypeScript 5
- **ORM**: Prisma 7 (with adapter pattern)
- **Database**: PostgreSQL
- **DI**: Awilix
- **Validation**: Zod
- **Logging**: Winston (with daily rotation)
- **Auth**: JWT (jsonwebtoken)
- **Password**: bcrypt
- **Package Manager**: pnpm

## Important Notes

1. **No direct imports** to internal modules - use DI
2. **Type-safe** - use `IContainerCradle` for all types
3. **Auto-registration** - follow naming conventions
4. **Clean code** - self-documenting, no comments
5. **YAGNI** - only add what's needed
6. **Fast iteration** - simple solutions first
7. **Error handling** - throw in service, catch in controller
8. **Logging** - use logger with context
9. **Response format** - consistent via response formatter
10. **Database** - use Prisma with singleton pattern
