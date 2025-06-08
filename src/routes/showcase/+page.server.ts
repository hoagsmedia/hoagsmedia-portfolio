import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Component Showcase',
		description: 'A showcase of UI components used in the application'
	};
};
