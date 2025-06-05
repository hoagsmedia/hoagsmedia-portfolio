import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { usersTable, projectTable, projectTechnology } from '../src/lib/server/db/schema.js';
// import * as schema from '../src/lib/server/db/schema.js';
import { hash } from '@node-rs/argon2';

// Load environment variables from .env file
config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const client = createClient({ url: DATABASE_URL });
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

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
			.insert(usersTable)
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

		console.log('✅ Created demo user:', demoUser);

		// Create sample projects
		const projects = await db
			.insert(projectTable)
			.values([
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
			])
			.returning();

		console.log('✅ Created projects:', projects.length);

		// Create a mapping of project titles to IDs
		const projectMap = new Map(projects.map((p) => [p.title, p.id]));

		// Define technologies for each project
		const projectTechnologies = {
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

		// Flatten technologies into individual records with projectId
		const techRecords: Array<{
			projectId: string;
			name: string;
			category: string;
			color: string;
		}> = [];
		for (const [projectTitle, technologies] of Object.entries(projectTechnologies)) {
			const projectId = projectMap.get(projectTitle);
			if (projectId) {
				for (const tech of technologies) {
					techRecords.push({
						projectId,
						name: tech.name,
						category: tech.category,
						color: tech.color
					});
				}
			}
		}

		await db.insert(projectTechnology).values(techRecords);

		console.log('🎉 Seeding completed successfully!');
	} catch (error) {
		console.error('❌ Seeding failed:', error);
		process.exit(1);
	}
}

// Run the seed function
async function main() {
	try {
		await seed();
		console.log('Seeding completed');
	} catch (error) {
		console.error('Error during seeding:', error);
		process.exit(1);
	}
}

main();
