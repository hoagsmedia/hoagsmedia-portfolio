import type { Actions, PageServerLoad } from './$types';
import { message, superValidate, type Infer } from 'sveltekit-superforms';
import { profileSchema, updatePasswordSchema } from './settings-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

type Message = { status: 'error' | 'success' | 'warning'; text: string };

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;
	console.log('Loading settings for user:', user);
	const userData = {
		...user,
		email: user.email ?? undefined
	};

	const profileForm = await superValidate<Infer<typeof profileSchema>, Message>(
		userData,
		zod(profileSchema)
	);
	const securityForm = await superValidate<Infer<typeof updatePasswordSchema>>(
		zod(updatePasswordSchema)
	);
	return {
		user,
		profileForm,
		securityForm
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		console.log('Update profile action called');
		if (!locals.user) {
			return fail(401, { profileForm: null, message: 'Unauthorized' });
		}

		const profileForm = await superValidate(request, zod(profileSchema));
		console.log('Profile form data:', profileForm.data);

		if (!profileForm.valid) return fail(400, { profileForm });

		const { username, email } = profileForm.data;

		try {
			// Check if username is already taken (by another user)
			if (username !== locals.user.username) {
				const existingUser = await db
					.select()
					.from(table.usersTable)
					.where(eq(table.usersTable.username, username))
					.limit(1);

				if (existingUser.length > 0) {
					return fail(400, { error: 'Username is already taken', profileForm });
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
			return message(profileForm, { text: 'Form posted successfully!', status: 'success' });

			// return message(profileForm, 'Profile updated successfully!');
		} catch (error) {
			console.error('Profile update error:', error);
			return fail(400, {
				text: ' Failed to update profile',
				profileForm
			});
		}
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { passwordError: 'Unauthorized' });
		}

		const passwordForm = await superValidate(request, zod(updatePasswordSchema));
		if (!passwordForm.valid) return fail(400, { passwordForm });

		try {
			// Get current user data
			const [userData] = await db
				.select()
				.from(table.usersTable)
				.where(eq(table.usersTable.id, locals.user.id))
				.limit(1);

			if (!userData) {
				return fail(404, { error: 'User not found', passwordForm });
			}

			// Verify current password
			const validPassword = await verify(userData.passwordHash, passwordForm.data.currentPassword, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			if (!validPassword) {
				return fail(400, { error: 'Current password is incorrect', passwordForm });
			}

			// Hash new password
			const newPasswordHash = await hash(passwordForm.data.password, {
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

			return message(passwordForm, { text: 'Password updated successfully!', status: 'success' });
		} catch (error) {
			console.error('Password change error:', error);
			return fail(400, {
				text: 'Failed to change password'
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
