<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	// Sample projects data
	const projects = [
		{
			id: 1,
			title: 'E-Commerce Platform',
			description:
				'Modern e-commerce solution built with SvelteKit and Stripe integration. Features include product catalog, shopping cart, user authentication, and admin dashboard.',
			technologies: ['SvelteKit', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
			status: 'Live',
			image: '/favicon.png', // placeholder
			demoUrl: 'https://demo.example.com',
			githubUrl: 'https://github.com/joshuahoagland/ecommerce-platform',
			featured: true
		},
		{
			id: 2,
			title: 'Task Management App',
			description:
				'Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
			technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
			status: 'In Development',
			image: '/favicon.png', // placeholder
			demoUrl: null,
			githubUrl: 'https://github.com/joshuahoagland/task-manager',
			featured: true
		},
		{
			id: 3,
			title: 'Weather Dashboard',
			description:
				'Interactive weather dashboard with location-based forecasts, weather maps, and customizable widgets for tracking multiple locations.',
			technologies: ['Vue.js', 'Express.js', 'OpenWeather API', 'Chart.js'],
			status: 'Live',
			image: '/favicon.png', // placeholder
			demoUrl: 'https://weather.example.com',
			githubUrl: 'https://github.com/joshuahoagland/weather-dashboard',
			featured: false
		},
		{
			id: 4,
			title: 'Portfolio Website',
			description:
				'Personal portfolio website built with modern web technologies, featuring dark mode, responsive design, and optimized performance.',
			technologies: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vercel'],
			status: 'Live',
			image: '/favicon.png', // placeholder
			demoUrl: 'https://hoagsmedia.com',
			githubUrl: 'https://github.com/joshuahoagland/portfolio',
			featured: false
		},
		{
			id: 5,
			title: 'API Documentation Tool',
			description:
				'Interactive API documentation generator with live testing capabilities, authentication examples, and code generation for multiple languages.',
			technologies: ['Svelte', 'FastAPI', 'Python', 'Docker', 'OpenAPI'],
			status: 'In Development',
			image: '/favicon.png', // placeholder
			demoUrl: null,
			githubUrl: 'https://github.com/joshuahoagland/api-docs',
			featured: false
		},
		{
			id: 6,
			title: 'Social Media Analytics',
			description:
				'Analytics dashboard for social media performance tracking with custom reporting, data visualization, and automated insights generation.',
			technologies: ['Next.js', 'Python', 'PostgreSQL', 'D3.js', 'AWS'],
			status: 'Live',
			image: '/favicon.png', // placeholder
			demoUrl: 'https://analytics.example.com',
			githubUrl: 'https://github.com/joshuahoagland/social-analytics',
			featured: false
		}
	];

	const featuredProjects = projects.filter((project) => project.featured);
	const otherProjects = projects.filter((project) => !project.featured);

	function getStatusColor(status: string) {
		switch (status) {
			case 'Live':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
			case 'In Development':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
		}
	}
</script>

<svelte:head>
	<title>Projects - Hoags Media</title>
</svelte:head>

<main class="min-h-screen bg-white px-4 py-12 transition-colors dark:bg-black">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-bold text-black md:text-5xl dark:text-white">Projects</h1>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				A showcase of my recent work and side projects
			</p>
		</div>

		<!-- Featured Projects -->
		<section class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-black dark:text-white">Featured Projects</h2>
			<div class="grid gap-8 md:grid-cols-2">
				{#each featuredProjects as project}
					<div
						class="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
					>
						<!-- Project Image Placeholder -->
						<div class="mb-4 aspect-video w-full rounded-lg bg-gray-100 dark:bg-gray-800">
							<img
								src={project.image}
								alt={project.title}
								class="h-full w-full rounded-lg object-cover"
							/>
						</div>

						<!-- Project Info -->
						<div class="space-y-4">
							<div class="flex items-start justify-between">
								<h3 class="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
								<span
									class="rounded-full px-2 py-1 text-xs font-medium {getStatusColor(
										project.status
									)}"
								>
									{project.status}
								</span>
							</div>

							<p class="text-gray-600 dark:text-gray-400">
								{project.description}
							</p>

							<!-- Technologies -->
							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<span
										class="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
									>
										{tech}
									</span>
								{/each}
							</div>

							<!-- Action Buttons -->
							<div class="flex space-x-3">
								{#if project.demoUrl}
									<Button
										class="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
										onclick={() => window.open(project.demoUrl, '_blank')}
									>
										View Demo
									</Button>
								{/if}
								<Button
									variant="outline"
									class="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
									onclick={() => window.open(project.githubUrl, '_blank')}
								>
									View Code
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Other Projects -->
		<section>
			<h2 class="mb-8 text-2xl font-semibold text-black dark:text-white">Other Projects</h2>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each otherProjects as project}
					<div
						class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
					>
						<div class="space-y-4">
							<div class="flex items-start justify-between">
								<h3 class="text-lg font-semibold text-black dark:text-white">{project.title}</h3>
								<span
									class="rounded-full px-2 py-1 text-xs font-medium {getStatusColor(
										project.status
									)}"
								>
									{project.status}
								</span>
							</div>

							<p class="text-sm text-gray-600 dark:text-gray-400">
								{project.description}
							</p>

							<!-- Technologies -->
							<div class="flex flex-wrap gap-1">
								{#each project.technologies.slice(0, 3) as tech}
									<span
										class="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
									>
										{tech}
									</span>
								{/each}
								{#if project.technologies.length > 3}
									<span
										class="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-500"
									>
										+{project.technologies.length - 3}
									</span>
								{/if}
							</div>

							<!-- Action Buttons -->
							<div class="flex space-x-2">
								{#if project.demoUrl}
									<Button
										size="sm"
										class="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
										onclick={() => window.open(project.demoUrl, '_blank')}
									>
										Demo
									</Button>
								{/if}
								<Button
									size="sm"
									variant="outline"
									class="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
									onclick={() => window.open(project.githubUrl, '_blank')}
								>
									Code
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Call to Action -->
		<section
			class="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center transition-colors dark:border-gray-700 dark:bg-gray-900"
		>
			<h2 class="mb-4 text-2xl font-semibold text-black dark:text-white">
				Interested in Working Together?
			</h2>
			<p class="mb-6 text-gray-600 dark:text-gray-400">
				I'm always open to discussing new projects and opportunities.
			</p>
			<Button
				class="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
				onclick={() => (window.location.href = '/contact')}
			>
				Get In Touch
			</Button>
		</section>
	</div>
</main>
