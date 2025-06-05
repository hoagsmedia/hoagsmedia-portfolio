import type { PageServerLoad } from './$types';
import { ProjectService } from '$lib/server/db/projects';
import type { ProjectWithTechnologies } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	try {
		// Get featured projects with their technologies
		const featuredProjects = await ProjectService.getFeaturedProjects();

		// Load technologies for each project
		const projectsWithTechnologies: ProjectWithTechnologies[] = await Promise.all(
			featuredProjects.map(async (project) => {
				const projectWithTech = await ProjectService.getProjectById(project.id);
				return projectWithTech || { ...project, technologies: [] };
			})
		);

		return {
			featuredProjects: projectsWithTechnologies
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		return {
			featuredProjects: []
		};
	}
};
