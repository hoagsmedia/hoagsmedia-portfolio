<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
		<div class="text-center">
			<h1 class="mb-2 text-2xl font-bold text-gray-900">Welcome back!</h1>
			<p class="mb-4 text-gray-600">You are successfully signed in.</p>
		</div>

		<div class="mb-6 rounded-lg bg-gray-50 p-4">
			<h2 class="mb-2 text-lg font-semibold text-gray-800">Account Information</h2>
			<div class="space-y-2">
				<p class="text-sm">
					<span class="font-medium text-gray-700">Username:</span>
					<span class="text-gray-900">{data.user.username}</span>
				</p>
				<p class="text-sm">
					<span class="font-medium text-gray-700">User ID:</span>
					<span class="font-mono text-xs text-gray-900">{data.user.id}</span>
				</p>
			</div>
		</div>

		<div class="flex flex-col space-y-3">
			<a
				href="/protected"
				class="inline-flex justify-center rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				View Protected Content
			</a>
			<a
				href="/settings"
				class="inline-flex justify-center rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
			>
				Account Settings
			</a>
			<a
				href="/"
				class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Back to Home
			</a>
			<form method="post" action="?/logout" use:enhance>
				<button
					type="submit"
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
				>
					Sign out
				</button>
			</form>
		</div>
	</div>
</div>
