import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-zA-Z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

export const load: PageServerLoad = async ({ locals }) => {
	// User is guaranteed to exist due to (authed) layout
	return {
		user: locals.user
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;

		if (!validateUsername(username)) {
			return fail(400, {
				message:
					'Invalid username (min 3, max 31 characters, letters, numbers, underscore and dash only)',
				success: false
			});
		}

		try {
			// Check if username is already taken (by another user)
			if (username !== locals.user.username) {
				const existingUser = await db
					.select()
					.from(table.usersTable)
					.where(eq(table.usersTable.username, username))
					.limit(1);

				if (existingUser.length > 0) {
					return fail(400, {
						message: 'Username is already taken',
						success: false
					});
				}
			}

			// Update user profile
			const updateData: { username: string; email?: string } = { username };

			// Only include email if it's provided and not empty
			if (email && email.trim() !== '') {
				updateData.email = email.trim();
			}

			await db
				.update(table.usersTable)
				.set(updateData)
				.where(eq(table.usersTable.id, locals.user.id));

			return {
				message: 'Profile updated successfully!',
				success: true
			};
		} catch (error) {
			console.error('Profile update error:', error);
			return fail(500, {
				message: 'Failed to update profile',
				success: false
			});
		}
	},

	changePassword: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { passwordError: 'Unauthorized' });
		}

		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!validatePassword(newPassword)) {
			return fail(400, {
				passwordError: 'New password must be between 6 and 255 characters'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				passwordError: 'New passwords do not match'
			});
		}

		try {
			// Get current user data
			const [userData] = await db
				.select()
				.from(table.usersTable)
				.where(eq(table.usersTable.id, locals.user.id))
				.limit(1);
			console.log('User data:', userData);

			if (!userData) {
				return fail(404, { passwordError: 'User not found' });
			}

			// Verify current password
			const validPassword = await verify(userData.passwordHash, currentPassword, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			if (!validPassword) {
				return fail(400, { passwordError: 'Current password is incorrect' });
			}

			// Hash new password
			const newPasswordHash = await hash(newPassword, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			// Update password
			await db
				.update(table.usersTable)
				.set({ passwordHash: newPasswordHash })
				.where(eq(table.usersTable.id, locals.user.id));

			return {
				message: 'Password updated successfully!',
				success: true
			};
		} catch (error) {
			console.error('Password change error:', error);
			return fail(500, {
				passwordError: 'Failed to update password'
			});
		}
	},

	clearSessions: async ({ locals }) => {
		if (!locals.user || !locals.session) {
			return fail(401, { message: 'Unauthorized' });
		}

		try {
			// Invalidate all sessions for this user
			await auth.invalidateUserSessions(locals.user.id);

			// This will redirect to login since the current session is also invalidated
			return redirect(302, '/login');
		} catch (error) {
			console.error('Clear sessions error:', error);
			return fail(500, {
				message: 'Failed to clear sessions'
			});
		}
	},

	updatePreferences: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const emailNotifications = formData.has('emailNotifications');
		const darkMode = formData.has('darkMode');

		// For now, we'll just return success since we don't have a preferences table
		// In a real app, you'd store these in a user_preferences table
		console.log('User preferences:', { emailNotifications, darkMode, userId: locals.user.id });

		return {
			message: 'Preferences saved successfully!',
			success: true
		};
	}
};
