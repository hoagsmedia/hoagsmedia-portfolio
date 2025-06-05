import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { config } from 'dotenv';
import {
	user,
	project,
	projectTechnology,
	type NewProject,
	type NewProjectTechnology
} from '../src/lib/server/db/schema.js';
import * as schema from '../src/lib/server/db/schema.js';
import { hash } from '@node-rs/argon2';

// Load environment variables from .env file
config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: DATABASE_URL });
const db = drizzle(client, { schema });

async function seed() {
	try {
		console.log('🌱 Starting database seeding...');

		// Create a demo user
		const passwordHash = await hash('password123', {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		console.log('👤 Creating demo user...');
		const [demoUser] = await db
			.insert(user)
			.values({
				id: 'demo-user-id',
				username: 'joshua',
				email: 'joshua@hoagsmedia.com',
				passwordHash,
				firstName: 'Joshua',
				lastName: 'Hoagland',
				bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
				website: 'https://hoagsmedia.com',
				location: 'Remote',
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning();

		console.log('✅ Created demo user:', demoUser.username);

		// Create sample projects
		const projects: NewProject[] = [
			{
				userId: demoUser.id,
				title: 'Hoags Media Portfolio',
				description: 'Personal portfolio website built with SvelteKit and Tailwind CSS',
				longDescription:
					'A modern, responsive portfolio website showcasing projects and skills. Built with SvelteKit for optimal performance and SEO, styled with Tailwind CSS for rapid development, and includes dark mode support.',
				demoUrl: 'https://hoagsmedia.com',
				codeUrl: 'https://github.com/joshua/hoagsmedia',
				status: 'completed' as const,
				featured: true,
				sortOrder: 1
			},
			{
				userId: demoUser.id,
				title: 'E-commerce Platform',
				description: 'Full-stack e-commerce solution with payment processing',
				longDescription:
					'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing with Stripe, and admin dashboard. Built with modern web technologies for scalability and performance.',
				demoUrl: 'https://demo-shop.example.com',
				codeUrl: 'https://github.com/joshua/ecommerce-platform',
				status: 'completed' as const,
				featured: true,
				sortOrder: 2
			},
			{
				userId: demoUser.id,
				title: 'Task Management App',
				description: 'Collaborative task management with real-time updates',
				longDescription:
					'A collaborative task management application with real-time synchronization, team collaboration features, and comprehensive project tracking capabilities.',
				demoUrl: 'https://taskapp.example.com',
				codeUrl: 'https://github.com/joshua/task-manager',
				status: 'in-progress' as const,
				featured: false,
				sortOrder: 3
			},
			{
				userId: demoUser.id,
				title: 'Weather Dashboard',
				description: 'Beautiful weather app with forecasting',
				longDescription:
					'An elegant weather dashboard providing current conditions and forecasts with beautiful visualizations and location-based services.',
				demoUrl: 'https://weather.example.com',
				codeUrl: 'https://github.com/joshua/weather-app',
				status: 'completed' as const,
				featured: false,
				sortOrder: 4
			},
			{
				userId: demoUser.id,
				title: 'Blog Engine',
				description: 'Modern blogging platform with markdown support',
				longDescription:
					'A feature-rich blogging platform with markdown support, syntax highlighting, SEO optimization, and a clean admin interface.',
				status: 'planning' as const,
				featured: false,
				sortOrder: 5
			}
		];

		for (const projectData of projects) {
			const [newProject] = await db.insert(project).values(projectData).returning();
			console.log('✅ Created project:', newProject.title);

			// Add technologies based on project type
			const technologies = getProjectTechnologies(newProject.title);

			for (const tech of technologies) {
				await db.insert(projectTechnology).values({
					projectId: newProject.id,
					...tech
				});
			}
		}

		console.log('🎉 Seeding completed successfully!');
	} catch (error) {
		console.error('❌ Seeding failed:', error);
		process.exit(1);
	}
}

function getProjectTechnologies(
	projectTitle: string
): Array<Omit<NewProjectTechnology, 'projectId'>> {
	const techMap: Record<string, Array<{ name: string; category: string; color: string }>> = {
		'Hoags Media Portfolio': [
			{ name: 'SvelteKit', category: 'frontend', color: '#ff3e00' },
			{ name: 'TypeScript', category: 'frontend', color: '#3178c6' },
			{ name: 'Tailwind CSS', category: 'frontend', color: '#06b6d4' },
			{ name: 'Drizzle ORM', category: 'backend', color: '#c5f74f' },
			{ name: 'SQLite', category: 'database', color: '#003b57' }
		],
		'E-commerce Platform': [
			{ name: 'Next.js', category: 'frontend', color: '#000000' },
			{ name: 'React', category: 'frontend', color: '#61dafb' },
			{ name: 'Node.js', category: 'backend', color: '#339933' },
			{ name: 'PostgreSQL', category: 'database', color: '#336791' },
			{ name: 'Stripe', category: 'backend', color: '#635bff' },
			{ name: 'Prisma', category: 'backend', color: '#2d3748' }
		],
		'Task Management App': [
			{ name: 'Vue.js', category: 'frontend', color: '#4fc08d' },
			{ name: 'Nuxt.js', category: 'frontend', color: '#00dc82' },
			{ name: 'Socket.io', category: 'backend', color: '#010101' },
			{ name: 'Express.js', category: 'backend', color: '#000000' },
			{ name: 'MongoDB', category: 'database', color: '#47a248' }
		],
		'Weather Dashboard': [
			{ name: 'React', category: 'frontend', color: '#61dafb' },
			{ name: 'TypeScript', category: 'frontend', color: '#3178c6' },
			{ name: 'Chart.js', category: 'frontend', color: '#ff6384' },
			{ name: 'OpenWeather API', category: 'backend', color: '#eb6e4b' }
		],
		'Blog Engine': [
			{ name: 'SvelteKit', category: 'frontend', color: '#ff3e00' },
			{ name: 'Markdown', category: 'frontend', color: '#000000' },
			{ name: 'Prism.js', category: 'frontend', color: '#5d2d91' },
			{ name: 'Node.js', category: 'backend', color: '#339933' }
		]
	};

	return techMap[projectTitle] || [];
}

// Run the seed function
seed();
