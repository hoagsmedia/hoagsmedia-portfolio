<script lang="ts">
	import type { PageProps } from './$types';
	import { Star } from '@lucide/svelte/icons';
	import SelectAdd from '$lib/components/showcase/SelectAdd.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Showcase - Hoags Media</title>
	<meta
		name="description"
		content="Explore our showcase of projects and achievements at Hoags Media."
	/>
</svelte:head>
<div class="container mx-auto px-4 py-8">
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
</div>
<article class="bg-card rounded-lg shadow transition-colors">
	<div class="p-6">
		<h2 class="text-card-foreground mb-4 text-2xl font-bold">Select with Add</h2>
		<p class="text-muted-foreground mb-6">
			This component allows you to select an item from a list and add new items dynamically. It is
			designed to enhance user experience by providing a seamless way to manage selections and
			additions.
		</p>
		<SelectAdd />
	</div>
</article>
