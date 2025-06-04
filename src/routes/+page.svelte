<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	// Sample resume data
	const resumeData = {
		name: 'Joshua Hoagland',
		title: 'Full Stack Developer',
		email: 'josh@hoagsmedia.com',
		phone: '+1 (555) 123-4567',
		location: 'San Francisco, CA',
		summary:
			'Passionate full stack developer with 5+ years of experience building modern web applications. Specialized in React, Node.js, and cloud technologies. Strong focus on user experience and scalable architecture.',
		experience: [
			{
				company: 'Hoags Media',
				position: 'Founder & Lead Developer',
				duration: '2020 - Present',
				description:
					'Founded and developed custom web solutions for clients. Built responsive websites and web applications using modern frameworks including Svelte, React, and Node.js.'
			},
			{
				company: 'TechCorp Solutions',
				position: 'Senior Frontend Developer',
				duration: '2018 - 2020',
				description:
					'Led frontend development for e-commerce platform serving 100k+ users. Improved page load times by 40% and increased conversion rates by 25%.'
			},
			{
				company: 'StartupXYZ',
				position: 'Full Stack Developer',
				duration: '2016 - 2018',
				description:
					'Developed MVP from concept to production. Built RESTful APIs, implemented authentication systems, and created responsive user interfaces.'
			}
		]
	};
</script>

<svelte:head>
	<title>Hoags Media</title>
</svelte:head>

<main class="min-h-screen bg-white px-4 py-12 transition-colors dark:bg-black">
	<div class="mx-auto max-w-6xl">
		<!-- 2-Column Layout -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Left Column - Avatar & Contact Info -->
			<div class="lg:col-span-1">
				<div
					class="sticky top-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900"
				>
					<!-- Avatar -->
					<div class="flex flex-col items-center space-y-4">
						<Avatar.Root class="size-32">
							<Avatar.Image src="/favicon.png" alt={resumeData.name} />
							<Avatar.Fallback
								class="bg-gray-100 text-2xl font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
							>
								{resumeData.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="text-center">
							<h2 class="text-xl font-bold text-black dark:text-white">{resumeData.name}</h2>
							<p class="text-gray-600 dark:text-gray-400">{resumeData.title}</p>
						</div>
					</div>

					<!-- Contact Information -->
					<div class="space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
						<div class="flex items-center space-x-3 text-sm">
							<span class="text-gray-500 dark:text-gray-400">📧</span>
							<span class="text-gray-700 dark:text-gray-300">{resumeData.email}</span>
						</div>
						<div class="flex items-center space-x-3 text-sm">
							<span class="text-gray-500 dark:text-gray-400">📞</span>
							<span class="text-gray-700 dark:text-gray-300">{resumeData.phone}</span>
						</div>
						<div class="flex items-center space-x-3 text-sm">
							<span class="text-gray-500 dark:text-gray-400">📍</span>
							<span class="text-gray-700 dark:text-gray-300">{resumeData.location}</span>
						</div>
					</div>

					<!-- Download Resume Button -->
					<Button
						class="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
					>
						Download Resume
					</Button>
				</div>
			</div>

			<!-- Right Column - Resume Content -->
			<div class="lg:col-span-2">
				<div class="space-y-8">
					<!-- Header -->
					<div class="border-b border-gray-200 pb-6 dark:border-gray-700">
						<h1 class="text-3xl font-bold text-black md:text-4xl dark:text-white">Resume</h1>
						<p class="mt-2 text-gray-600 dark:text-gray-400">
							Professional Experience & Background
						</p>
					</div>

					<!-- Summary Section -->
					<div class="space-y-4">
						<h2 class="text-xl font-semibold text-black dark:text-white">Professional Summary</h2>
						<div
							class="rounded-lg border border-gray-200 bg-gray-50 p-6 transition-colors dark:border-gray-700 dark:bg-gray-800"
						>
							<p class="leading-relaxed text-gray-700 dark:text-gray-300">
								{resumeData.summary}
							</p>
						</div>
					</div>

					<!-- Work Experience Section -->
					<div class="space-y-6">
						<h2 class="text-xl font-semibold text-black dark:text-white">Work Experience</h2>
						<div class="space-y-6">
							{#each resumeData.experience as job}
								<div
									class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900"
								>
									<div class="mb-4 flex flex-col justify-between sm:flex-row sm:items-start">
										<div>
											<h3 class="text-lg font-semibold text-black dark:text-white">
												{job.position}
											</h3>
											<p class="font-medium text-gray-700 dark:text-gray-300">{job.company}</p>
										</div>
										<span
											class="mt-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 sm:mt-0 dark:bg-gray-800 dark:text-gray-400"
										>
											{job.duration}
										</span>
									</div>
									<p class="leading-relaxed text-gray-600 dark:text-gray-400">
										{job.description}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Skills Section -->
					<div class="space-y-4">
						<h2 class="text-xl font-semibold text-black dark:text-white">Technical Skills</h2>
						<div
							class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900"
						>
							<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
								{#each ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'] as skill}
									<span
										class="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
									>
										{skill}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
