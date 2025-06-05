<script lang="ts">
	import type { PageData } from './$types';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink, Github, Eye, Calendar, Star } from '@lucide/svelte/icons';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { featuredProjects } = data;

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed':
				return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
			case 'in-progress':
				return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
			case 'planning':
				return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800';
			case 'maintenance':
				return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800';
			default:
				return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800';
		}
	}

	function formatStatus(status: string) {
		return status
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function formatDate(date: Date | string) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short'
		});
	}

	function getCategoryColor(category: string) {
		switch (category) {
			case 'frontend':
				return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
			case 'backend':
				return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
			case 'database':
				return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
			case 'devops':
				return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
			default:
				return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
		}
	}
</script>

<svelte:head>
	<title>Projects - Hoags Media</title>
	<meta
		name="description"
		content="Explore my portfolio of web development projects built with modern technologies."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header Section -->
		<div class="mb-16 text-center">
			<div
				class="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
			>
				<Star class="h-4 w-4" />
				Featured Work
			</div>
			<h1
				class="from-foreground to-foreground/60 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight"
			>
				My Projects
			</h1>
			<p class="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
				A showcase of web applications and tools I've crafted using cutting-edge technologies. Each
				project represents a unique challenge and a step forward in my development journey.
			</p>
		</div>

		<!-- Projects Grid -->
		{#if featuredProjects && featuredProjects.length > 0}
			<div class="grid gap-8 lg:gap-10">
				{#each featuredProjects as project}
					<article
						class="group bg-card relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					>
						<!-- Project Header with Visual Accent -->
						<div
							class="from-primary/60 via-primary to-primary/60 absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
						></div>

						<div class="p-8">
							<div class="flex flex-col gap-6 lg:flex-row">
								<!-- Main Content -->
								<div class="flex-1 space-y-6">
									<!-- Header Section -->
									<div class="space-y-4">
										<div class="flex items-start justify-between gap-4">
											<div class="space-y-2">
												<h2
													class="group-hover:text-primary text-3xl font-bold tracking-tight transition-colors duration-200"
												>
													{project.title}
												</h2>
												<p class="text-muted-foreground text-lg">
													{project.description}
												</p>
											</div>
											<div class="flex shrink-0 items-center gap-2">
												<Badge class={getStatusColor(project.status)} variant="outline">
													{formatStatus(project.status)}
												</Badge>
												{#if project.featured}
													<Badge
														variant="secondary"
														class="bg-primary/10 text-primary border-primary/20"
													>
														<Star class="mr-1 h-3 w-3" />
														Featured
													</Badge>
												{/if}
											</div>
										</div>

										<!-- Long Description -->
										{#if project.longDescription}
											<p class="text-muted-foreground text-base leading-relaxed">
												{project.longDescription}
											</p>
										{/if}
									</div>

									<!-- Technologies -->
									{#if project.technologies && project.technologies.length > 0}
										<div class="space-y-3">
											<h3
												class="text-muted-foreground text-sm font-semibold tracking-wide uppercase"
											>
												Technologies Used
											</h3>
											<div class="flex flex-wrap gap-2">
												{#each project.technologies as tech}
													<Badge
														variant="outline"
														class="{getCategoryColor(
															tech.category ?? ''
														)} border-current/20 font-medium"
														style="color: {tech.color}; border-color: {tech.color}20; background-color: {tech.color}10;"
													>
														{tech.name}
													</Badge>
												{/each}
											</div>
										</div>
									{/if}

									<!-- Project Meta -->
									<div class="text-muted-foreground flex items-center gap-4 text-sm">
										<div class="flex items-center gap-1">
											<Calendar class="h-4 w-4" />
											<span>Created {formatDate(project.createdAt)}</span>
										</div>
									</div>
								</div>

								<!-- Actions Sidebar -->
								<div class="shrink-0 lg:w-48">
									<div class="flex gap-3 lg:flex-col">
										{#if project.demoUrl}
											<Button
												variant="default"
												size="sm"
												class="inline-flex flex-1 items-center justify-center gap-2 lg:w-full"
												href={project.demoUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Eye class="h-4 w-4" />
												Live Demo
												<ExternalLink class="h-3 w-3" />
											</Button>
										{/if}

										{#if project.codeUrl}
											<Button
												variant="outline"
												size="sm"
												class="inline-flex flex-1 items-center justify-center gap-2 lg:w-full"
												href={project.codeUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Github class="h-4 w-4" />
												Source
												<ExternalLink class="h-3 w-3" />
											</Button>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<!-- Empty State -->
			<div class="py-20 text-center">
				<div class="mx-auto max-w-md">
					<div class="relative mb-8">
						<div
							class="from-primary/20 to-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br"
						>
							<Github class="text-primary h-10 w-10" />
						</div>
						<div
							class="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400"
						>
							<Star class="h-3 w-3 text-yellow-800" />
						</div>
					</div>
					<h3 class="mb-3 text-2xl font-bold">Projects Coming Soon</h3>
					<p class="text-muted-foreground mb-8 text-lg">
						I'm currently working on some exciting projects that will be showcased here. Check back
						soon to see what I'm building!
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<Button variant="outline" size="lg">Check Back Soon</Button>
						<Button variant="ghost" size="lg" href="/contact">Get Notified</Button>
					</div>
				</div>
			</div>
		{/if}

		<!-- Contact CTA -->
		<div class="mt-20">
			<div
				class="from-primary/5 via-background to-primary/5 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 lg:p-12"
			>
				<div class="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] absolute inset-0"></div>
				<div class="relative mx-auto max-w-2xl text-center">
					<h2 class="mb-4 text-3xl font-bold">Let's Build Something Amazing Together</h2>
					<p class="text-muted-foreground mb-8 text-lg">
						Have an idea for a project? I'm always excited to collaborate on innovative solutions
						and tackle new challenges. Let's discuss how we can bring your vision to life.
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<Button size="lg" href="/contact" class="inline-flex items-center gap-2">
							Get In Touch
							<ExternalLink class="h-4 w-4" />
						</Button>
						<Button variant="outline" size="lg" href="/about">Learn More About Me</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	article {
		background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%);
		border: 1px solid hsl(var(--border));
		backdrop-filter: blur(8px);
	}

	article:hover {
		border-color: hsl(var(--primary) / 0.3);
		box-shadow:
			0 10px 25px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1),
			0 0 0 1px hsl(var(--primary) / 0.05);
	}

	/* Smooth hover animations for cards */
	article {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
