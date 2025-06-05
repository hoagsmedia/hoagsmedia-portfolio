import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	email: text('email').unique(),
	passwordHash: text('password_hash').notNull(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	bio: text('bio'),
	website: text('website'),
	location: text('location'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const project = sqliteTable('project', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description'),
	longDescription: text('long_description'),
	imageUrl: text('image_url'),
	demoUrl: text('demo_url'),
	codeUrl: text('code_url'),
	status: text('status', { enum: ['planning', 'in-progress', 'completed', 'maintenance'] })
		.notNull()
		.default('planning'),
	featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
	sortOrder: integer('sort_order').default(0),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

export const projectTechnology = sqliteTable('project_technology', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	category: text('category'), // frontend, backend, database, devops, etc.
	color: text('color').default('#6366f1') // hex color for the tech badge
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
	projects: many(project),
	sessions: many(session)
}));

export const projectRelations = relations(project, ({ one, many }) => ({
	user: one(user, {
		fields: [project.userId],
		references: [user.id]
	}),
	technologies: many(projectTechnology)
}));

export const projectTechnologyRelations = relations(projectTechnology, ({ one }) => ({
	project: one(project, {
		fields: [projectTechnology.projectId],
		references: [project.id]
	})
}));

// Export types
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Project = typeof project.$inferSelect;
export type NewProject = typeof project.$inferInsert;

export type ProjectTechnology = typeof projectTechnology.$inferSelect;
export type NewProjectTechnology = typeof projectTechnology.$inferInsert;

// Project with technologies
export type ProjectWithTechnologies = Project & {
	technologies: ProjectTechnology[];
};
