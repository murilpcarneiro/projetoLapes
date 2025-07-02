import { IUserRepository } from 'app/repositories/IUserRepository';
import { User } from 'domain/entities/User';
import { eq } from 'drizzle-orm';
import { db } from 'infra/db/config/db';
import { users } from 'infra/db/schema';

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!row) return null;
    return new User(row.name, row.email, row.password, row.role, row.id);
  }

  async save(user: User): Promise<void> {
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      role: user.role,
    });
  }
}