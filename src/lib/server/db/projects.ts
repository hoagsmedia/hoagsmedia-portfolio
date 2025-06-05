import { db } from './index';
import {
	project,
	projectTechnology,
	type NewProject,
	type NewProjectTechnology,
	type Project,
	type ProjectWithTechnologies
} from './schema';
import { eq, desc, asc } from 'drizzle-orm';

export class ProjectService {
	// Get all projects for a user
	static async getProjectsByUserId(userId: string): Promise<Project[]> {
		return await db
			.select()
			.from(project)
			.where(eq(project.userId, userId))
			.orderBy(desc(project.featured), asc(project.sortOrder), desc(project.createdAt));
	}

	// Get all public/featured projects
	static async getFeaturedProjects(): Promise<Project[]> {
		return await db
			.select()
			.from(project)
			.where(eq(project.featured, true))
			.orderBy(asc(project.sortOrder), desc(project.createdAt));
	}

	// Get a single project with technologies
	static async getProjectById(projectId: string): Promise<ProjectWithTechnologies | null> {
		const projectData = await db.select().from(project).where(eq(project.id, projectId)).limit(1);

		if (projectData.length === 0) return null;

		const technologies = await db
			.select()
			.from(projectTechnology)
			.where(eq(projectTechnology.projectId, projectId));

		return {
			...projectData[0],
			technologies
		};
	}

	// Create a new project
	static async createProject(projectData: NewProject) {
		const [newProject] = await db.insert(project).values(projectData).returning();
		return newProject;
	}

	// Update project
	static async updateProject(projectId: string, updates: Partial<NewProject>) {
		const [updatedProject] = await db
			.update(project)
			.set({
				...updates,
				updatedAt: new Date()
			})
			.where(eq(project.id, projectId))
			.returning();
		return updatedProject;
	}

	// Delete project
	static async deleteProject(projectId: string) {
		await db.delete(project).where(eq(project.id, projectId));
	}

	// Add technology to project
	static async addTechnologyToProject(tech: NewProjectTechnology) {
		const [newTech] = await db.insert(projectTechnology).values(tech).returning();
		return newTech;
	}

	// Remove technology from project
	static async removeTechnologyFromProject(techId: string) {
		await db.delete(projectTechnology).where(eq(projectTechnology.id, techId));
	}

	// Update technology
	static async updateTechnology(techId: string, updates: Partial<NewProjectTechnology>) {
		const [updatedTech] = await db
			.update(projectTechnology)
			.set(updates)
			.where(eq(projectTechnology.id, techId))
			.returning();
		return updatedTech;
	}
}
