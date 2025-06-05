import { db } from './index';
import { user, type NewUser, type User } from './schema';
import { eq } from 'drizzle-orm';

export class UserService {
	// Get user by ID
	static async getUserById(userId: string): Promise<User | null> {
		const users = await db.select().from(user).where(eq(user.id, userId)).limit(1);
		return users[0] || null;
	}

	// Get user by username
	static async getUserByUsername(username: string): Promise<User | null> {
		const users = await db.select().from(user).where(eq(user.username, username)).limit(1);
		return users[0] || null;
	}

	// Get user by email
	static async getUserByEmail(email: string): Promise<User | null> {
		const users = await db.select().from(user).where(eq(user.email, email)).limit(1);
		return users[0] || null;
	}

	// Create new user
	static async createUser(userData: NewUser): Promise<User> {
		const [newUser] = await db.insert(user).values(userData).returning();
		return newUser;
	}

	// Update user
	static async updateUser(userId: string, updates: Partial<NewUser>): Promise<User> {
		const [updatedUser] = await db
			.update(user)
			.set({
				...updates,
				updatedAt: new Date()
			})
			.where(eq(user.id, userId))
			.returning();
		return updatedUser;
	}

	// Delete user
	static async deleteUser(userId: string): Promise<void> {
		await db.delete(user).where(eq(user.id, userId));
	}
}
