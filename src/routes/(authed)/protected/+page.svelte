<script lang="ts">
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="rounded-lg bg-white shadow">
			<div class="px-4 py-5 sm:p-6">
				<h1 class="mb-4 text-3xl font-bold text-gray-900">Protected Content</h1>
				<p class="mb-6 text-gray-600">
					This page is only accessible to authenticated users. You are currently logged in as:
				</p>

				<div class="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
					<div class="flex">
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Authentication Successful</h3>
							<div class="mt-2 text-sm text-green-700">
								<p><strong>Username:</strong> {data.user.username}</p>
								<p>
									<strong>User ID:</strong> <code class="font-mono text-xs">{data.user.id}</code>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-900">What you can do here:</h2>
					<ul class="list-inside list-disc space-y-2 text-gray-600">
						<li>Access your user dashboard</li>
						<li>View protected resources</li>
						<li>Manage your account settings</li>
						<li>Access premium features</li>
					</ul>
				</div>

				<div class="mt-8 flex space-x-4">
					<a
						href="/dashboard"
						class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Go to Dashboard
					</a>
					<a
						href="/"
						class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Back to Home
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
