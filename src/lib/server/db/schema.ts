import { pgTable, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	email: varchar('email', { length: 255 }).unique(),
	passwordHash: text('password_hash').notNull(),
	firstName: varchar('first_name', { length: 255 }),
	lastName: varchar('last_name', { length: 255 }),
	bio: text('bio'),
	website: varchar('website', { length: 500 }),
	location: varchar('location', { length: 255 }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const session = pgTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => usersTable.id),
	expiresAt: timestamp('expires_at').notNull()
});

export const projectTable = pgTable('project', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => usersTable.id),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	longDescription: text('long_description'),
	imageUrl: varchar('image_url', { length: 500 }),
	demoUrl: varchar('demo_url', { length: 500 }),
	codeUrl: varchar('code_url', { length: 500 }),
	status: varchar('status', { length: 20 }).notNull().default('planning'),
	featured: boolean('featured').notNull().default(false),
	sortOrder: integer('sort_order').default(0),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const projectTechnology = pgTable('project_technology', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: varchar('project_id', { length: 255 })
		.notNull()
		.references(() => projectTable.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	category: varchar('category', { length: 100 }),
	color: varchar('color', { length: 7 }).default('#6366f1')
});

// Export types
export type Session = typeof session.$inferSelect;
export type Users = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Project = typeof projectTable.$inferSelect;
export type NewProject = typeof projectTable.$inferInsert;

export type ProjectTechnology = typeof projectTechnology.$inferSelect;
export type NewProjectTechnology = typeof projectTechnology.$inferInsert;

// Project with technologies
export type ProjectWithTechnologies = Project & {
	technologies: ProjectTechnology[];
};
