import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Check if user is authenticated
	if (!locals.user) {
		// Redirect to login if not authenticated
		throw redirect(302, '/login');
	}

	// Return user data to all child routes
	return {
		user: locals.user
	};
};
