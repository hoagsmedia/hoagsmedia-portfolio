<script lang="ts">
	import '../app.css';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LightSwitch } from '$lib/components';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: any; data: LayoutServerData } = $props();
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
				{#if data.user}
					<div class="flex items-center space-x-2">
						<NavigationMenu.Link
							href="/auth/lucia"
							class="hover:text-gray-600 dark:hover:text-gray-400">Dashboard</NavigationMenu.Link
						>
						<span class="text-sm text-gray-500 dark:text-gray-400">({data.user.username})</span>
					</div>
				{:else}
					<NavigationMenu.Link
						href="/auth/lucia/login"
						class="hover:text-gray-600 dark:hover:text-gray-400">Login</NavigationMenu.Link
					>
				{/if}
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<LightSwitch />
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</div>
{@render children()}
