import { z } from 'zod';

export const profileSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(31, 'Username must be at most 31 characters long')
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			'Username can only contain letters, numbers, underscores, and dashes'
		),
	email: z.string().email('Invalid email address').optional()
});

export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(20, 'Password must be at most 20 characters long')
			.refine((password) => /[A-Z]/.test(password), {
				message: 'Password must contain at least one uppercase letter'
			})
			.refine((password) => /[a-z]/.test(password), {
				message: 'Password must contain at least one lowercase letter'
			})
			.refine((password) => /[0-9]/.test(password), {
				message: 'Password must contain at least one number'
			}),
		// .refine((password) => /[!@#$%^&*]/.test(password), {
		// 	message: 'Password must contain at least one special character (!@#$%^&*)'
		// }),
		confirmPassword: z.string().min(1, 'Confirm password is required')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match'
	})
	.refine((data) => data.password !== data.currentPassword, {
		message: 'New password must be different from current password'
	});

export type ProfileSchema = typeof profileSchema;
export type UpdatePasswordSchema = typeof updatePasswordSchema;
