<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Sign in to your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or create a new account if you don't have one
			</p>
		</div>
		<form class="mt-8 space-y-6" method="post" action="?/login" use:enhance>
			<div class="space-y-4 rounded-md shadow-sm">
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
					<input
						id="username"
						name="username"
						type="text"
						required
						class="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
						placeholder="Enter your username"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
						placeholder="Enter your password"
					/>
				</div>
			</div>

			{#if form?.message}
				<div class="rounded-md bg-red-50 p-4">
					<p class="text-sm text-red-800">{form.message}</p>
				</div>
			{/if}

			<div class="space-y-3">
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Sign in
				</button>
				<button
					type="submit"
					formaction="?/register"
					class="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Create new account
				</button>
			</div>
		</form>
	</div>
</div>
