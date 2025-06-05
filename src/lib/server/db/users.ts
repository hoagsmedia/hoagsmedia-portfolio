import { db } from './index';
import { usersTable, type NewUser, type Users } from './schema';
import { eq } from 'drizzle-orm';

export class UserService {
	// Get user by ID
	static async getUserById(userId: string): Promise<Users | null> {
		const users = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
		return users[0] || null;
	}

	// Get user by username
	static async getUserByUsername(username: string): Promise<Users | null> {
		const users = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, username))
			.limit(1);
		return users[0] || null;
	}

	// Get user by email
	static async getUserByEmail(email: string): Promise<Users | null> {
		const users = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
		return users[0] || null;
	}

	// Create new user
	static async createUser(userData: NewUser): Promise<Users> {
		const [newUser] = await db.insert(usersTable).values(userData).returning();
		return newUser;
	}

	// Update user
	static async updateUser(userId: string, updates: Partial<NewUser>): Promise<Users> {
		const [updatedUser] = await db
			.update(usersTable)
			.set({
				...updates,
				updatedAt: new Date()
			})
			.where(eq(usersTable.id, userId))
			.returning();
		return updatedUser;
	}

	// Delete user
	static async deleteUser(userId: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, userId));
	}
}
