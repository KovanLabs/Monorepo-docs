import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { User, CreateUserInput, PublicUser } from "./types";

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.DB;

  if (!databaseUrl) {
    throw new Error("Missing database connection string. Set DATABASE_URL or DB.");
  }

  return databaseUrl;
}

function toPublic(user: User): PublicUser {
  const { passwordHash: _, ...pub } = user;
  return pub;
}

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
});
const prisma = new PrismaClient({ adapter });

class PrismaStore {
  async createUser(input: CreateUserInput): Promise<PublicUser> {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        username: input.username,
        passwordHash: input.passwordHash,
        role: input.role,
      },
    });
    return toPublic(user as unknown as User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user as unknown as User | null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    return user as unknown as User | null;
  }

  async findById(id: string): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return toPublic(user as unknown as User);
  }

  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }
}

export const store = new PrismaStore();
