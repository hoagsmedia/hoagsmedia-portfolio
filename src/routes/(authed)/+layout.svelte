<script lang="ts">
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Authenticated layout header -->
	<header class="border-b bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-4">
					<h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
					<nav class="flex space-x-4">
						<a
							href="/dashboard"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
						>
							Dashboard
						</a>
						<a
							href="/projects"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
						>
							Projects
						</a>
						<a
							href="/protected"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
						>
							Protected
						</a>
						<a
							href="/settings"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
						>
							Settings
						</a>
					</nav>
				</div>

				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-600">
						Welcome, {data.user.username}!
					</span>
					<form action="/dashboard?/logout" method="POST" class="inline">
						<button
							type="submit"
							class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
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
