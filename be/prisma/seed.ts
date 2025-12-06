/** @format */

import 'dotenv/config';
import bcrypt from 'bcrypt';
import {PrismaClient, Role} from '@prisma/client';
import {Pool} from 'pg';
import {PrismaPg} from '@prisma/adapter-pg';

interface ISeedUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const seedUsers: ISeedUser[] = [
  {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'SuperAdmin123!',
    role: Role.SUPER_ADMIN,
  },
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'Admin123!',
    role: Role.ADMIN,
  },
];

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({adapter});

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    console.log('Starting seed process...');

    for (const userData of seedUsers) {
      const existingUser = await prisma.user.findUnique({
        where: {email: userData.email},
      });

      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      const hashedPassword = await hashPassword(userData.password);

      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        },
      });

      console.log(`User created: ${user.email} (${user.role})`);
    }

    console.log('Seed process completed successfully');
  } catch (error) {
    console.error('Seed process failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed execution failed:', error);
    process.exit(1);
  });
