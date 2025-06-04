<script lang="ts">
	import '../app.css';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { themeStore } from '$lib/stores/theme.svelte.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let { children } = $props();
</script>

<div
	class="flex flex-col items-center justify-center bg-white text-black transition-colors dark:bg-black dark:text-white"
>
	<NavigationMenu.Root class="py-4">
		<NavigationMenu.List class="flex items-center space-x-4">
			<NavigationMenu.Item>
				<Button
					variant="ghost"
					onclick={() => (window.location.href = '/')}
					class="mr-4 px-2 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-800"
					aria-label="Go to home page"
				>
					←
				</Button>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/projects" class="hover:text-gray-600 dark:hover:text-gray-400"
					>Projects</NavigationMenu.Link
				>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/contact" class="hover:text-gray-600 dark:hover:text-gray-400"
					>Contact</NavigationMenu.Link
				>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<Button
					variant="outline"
					onclick={themeStore.toggle}
					class="ml-4 border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
				>
					{themeStore.isDark ? '☀️' : '🌙'}
				</Button>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</div>
{@render children()}
