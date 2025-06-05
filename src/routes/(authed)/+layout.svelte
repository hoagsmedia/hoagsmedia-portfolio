<script lang="ts">
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<div class="bg-background min-h-screen transition-colors">
	<!-- Authenticated layout header -->
	<header class="bg-card border-b shadow-sm transition-colors">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-4">
					<h1 class="text-card-foreground text-xl font-semibold">Dashboard</h1>
					<nav class="flex space-x-4">
						<a
							href="/dashboard"
							class="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
						>
							Dashboard
						</a>
						<a
							href="/projects"
							class="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
						>
							Projects
						</a>
						<a
							href="/protected"
							class="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
						>
							Protected
						</a>
						<a
							href="/settings"
							class="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
						>
							Settings
						</a>
					</nav>
				</div>

				<div class="flex items-center space-x-4">
					<span class="text-muted-foreground text-sm">
						Welcome, {data.user.username}!
					</span>
					<form action="/dashboard?/logout" method="POST" class="inline">
						<button
							type="submit"
							class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
						>
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	</header>

	<!-- Main content area -->
	<main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
