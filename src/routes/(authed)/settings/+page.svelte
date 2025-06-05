<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutData } from '../$types';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { data, form }: { data: LayoutData; form: ActionData } = $props();

	let isChangingPassword = $state(false);
</script>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Account Settings</h1>
			<p class="mt-2 text-gray-600">Manage your account preferences and security settings.</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-3">
			<!-- Sidebar Navigation -->
			<div class="lg:col-span-1">
				<nav class="space-y-1">
					<a
						href="#profile"
						class="flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
					>
						Profile
					</a>
					<a
						href="#security"
						class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
					>
						Security
					</a>
					<a
						href="#preferences"
						class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
					>
						Preferences
					</a>
				</nav>
			</div>

			<!-- Main Content -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Profile Section -->
				<div id="profile" class="rounded-lg bg-white shadow">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="mb-4 text-lg font-medium text-gray-900">Profile Information</h3>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<div class="rounded-md border border-gray-200 bg-gray-50 p-4">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<div
												class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600"
											>
												<span class="text-sm font-medium text-white">
													{data.user.username.charAt(0).toUpperCase()}
												</span>
											</div>
										</div>
										<div>
											<p class="text-sm font-medium text-gray-900">{data.user.username}</p>
											<p class="text-sm text-gray-500">User ID: {data.user.id}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<form method="POST" action="?/updateProfile" use:enhance class="mt-6">
							<div class="grid gap-4 sm:grid-cols-2">
								<div class="sm:col-span-1">
									<Label for="username">Username</Label>
									<Input
										id="username"
										name="username"
										type="text"
										value={data.user.username}
										class="mt-1"
									/>
								</div>
								<div class="sm:col-span-1">
									<Label for="email">Email (optional)</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={data.user.email || ''}
										placeholder="your@email.com"
										class="mt-1"
									/>
								</div>
							</div>

							{#if form?.message}
								<div
									class="mt-4 rounded-md {form.success
										? 'border border-green-200 bg-green-50'
										: 'border border-red-200 bg-red-50'} p-4"
								>
									<p class="text-sm {form.success ? 'text-green-800' : 'text-red-800'}">
										{form.message}
									</p>
								</div>
							{/if}

							<div class="mt-6">
								<Button type="submit" class="w-full sm:w-auto">Update Profile</Button>
							</div>
						</form>
					</div>
				</div>

				<!-- Security Section -->
				<div id="security" class="rounded-lg bg-white shadow">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="mb-4 text-lg font-medium text-gray-900">Security Settings</h3>

						<div class="space-y-6">
							<!-- Change Password -->
							<div>
								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-sm font-medium text-gray-900">Password</h4>
										<p class="text-sm text-gray-500">Change your account password</p>
									</div>
									<Button
										variant="outline"
										onclick={() => (isChangingPassword = !isChangingPassword)}
									>
										{isChangingPassword ? 'Cancel' : 'Change Password'}
									</Button>
								</div>

								{#if isChangingPassword}
									<form method="POST" action="?/changePassword" use:enhance class="mt-4 space-y-4">
										<div>
											<Label for="currentPassword">Current Password</Label>
											<Input
												id="currentPassword"
												name="currentPassword"
												type="password"
												required
												class="mt-1"
											/>
										</div>
										<div>
											<Label for="newPassword">New Password</Label>
											<Input
												id="newPassword"
												name="newPassword"
												type="password"
												required
												minlength={6}
												class="mt-1"
											/>
										</div>
										<div>
											<Label for="confirmPassword">Confirm New Password</Label>
											<Input
												id="confirmPassword"
												name="confirmPassword"
												type="password"
												required
												minlength={6}
												class="mt-1"
											/>
										</div>

										{#if form?.passwordError}
											<div class="rounded-md border border-red-200 bg-red-50 p-4">
												<p class="text-sm text-red-800">{form.passwordError}</p>
											</div>
										{/if}

										<div class="flex space-x-3">
											<Button type="submit">Update Password</Button>
											<Button
												type="button"
												variant="outline"
												onclick={() => (isChangingPassword = false)}
											>
												Cancel
											</Button>
										</div>
									</form>
								{/if}
							</div>

							<!-- Account Actions -->
							<div class="border-t pt-6">
								<h4 class="mb-4 text-sm font-medium text-gray-900">Account Actions</h4>
								<div class="space-y-3">
									<form method="POST" action="?/clearSessions" use:enhance>
										<Button variant="outline" type="submit" class="w-full sm:w-auto">
											Sign out of all devices
										</Button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Preferences Section -->
				<div id="preferences" class="rounded-lg bg-white shadow">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="mb-4 text-lg font-medium text-gray-900">Preferences</h3>

						<form method="POST" action="?/updatePreferences" use:enhance>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
										<p class="text-sm text-gray-500">Receive email updates about your account</p>
									</div>
									<input
										type="checkbox"
										name="emailNotifications"
										class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
								</div>

								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-sm font-medium text-gray-900">Dark Mode</h4>
										<p class="text-sm text-gray-500">Use dark theme for the interface</p>
									</div>
									<input
										type="checkbox"
										name="darkMode"
										class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
								</div>
							</div>

							<div class="mt-6">
								<Button type="submit" class="w-full sm:w-auto">Save Preferences</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- Back Navigation -->
		<div class="mt-8 flex space-x-4">
			<a
				href="/dashboard"
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				← Back to Dashboard
			</a>
		</div>
	</div>
</div>
