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

<div class="bg-muted min-h-screen px-4 py-12 transition-colors sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<h1 class="text-foreground text-3xl font-bold">Account Settings</h1>
			<p class="text-muted-foreground mt-2">
				Manage your account preferences and security settings.
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-3">
			<!-- Sidebar Navigation -->
			<div class="lg:col-span-1">
				<nav class="space-y-1">
					<a
						href="#profile"
						class="bg-primary text-primary-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
					>
						Profile
					</a>
					<a
						href="#security"
						class="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
					>
						Security
					</a>
					<a
						href="#preferences"
						class="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
					>
						Preferences
					</a>
				</nav>
			</div>

			<!-- Main Content -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Profile Section -->
				<div id="profile" class="bg-card rounded-lg shadow transition-colors">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-card-foreground mb-4 text-lg font-medium">Profile Information</h3>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<div class="bg-muted rounded-md border p-4 transition-colors">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<div
												class="bg-primary flex h-10 w-10 items-center justify-center rounded-full"
											>
												<span class="text-primary-foreground text-sm font-medium">
													{data.user.username.charAt(0).toUpperCase()}
												</span>
											</div>
										</div>
										<div>
											<p class="text-card-foreground text-sm font-medium">
												{data.user.username}
											</p>
											<p class="text-muted-foreground text-sm">
												User ID: {data.user.id}
											</p>
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
									class="mt-4 rounded-md border p-4 transition-colors {form.success
										? 'border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-300'
										: 'border-destructive/20 bg-destructive/10 text-destructive'}"
								>
									<p class="text-sm">
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
				<div id="security" class="bg-card rounded-lg shadow transition-colors">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-card-foreground mb-4 text-lg font-medium">Security Settings</h3>

						<div class="space-y-6">
							<!-- Change Password -->
							<div>
								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-card-foreground text-sm font-medium">Password</h4>
										<p class="text-muted-foreground text-sm">Change your account password</p>
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
											<div
												class="border-destructive/20 bg-destructive/10 rounded-md border p-4 transition-colors"
											>
												<p class="text-destructive text-sm">{form.passwordError}</p>
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
							<div class="border-t pt-6 transition-colors">
								<h4 class="text-card-foreground mb-4 text-sm font-medium">Account Actions</h4>
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
				<div id="preferences" class="bg-card rounded-lg shadow transition-colors">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-card-foreground mb-4 text-lg font-medium">Preferences</h3>

						<form method="POST" action="?/updatePreferences" use:enhance>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-card-foreground text-sm font-medium">Email Notifications</h4>
										<p class="text-muted-foreground text-sm">
											Receive email updates about your account
										</p>
									</div>
									<input
										type="checkbox"
										name="emailNotifications"
										class="border-input text-primary focus:ring-ring h-4 w-4 rounded transition-colors"
									/>
								</div>

								<div class="flex items-center justify-between">
									<div>
										<h4 class="text-card-foreground text-sm font-medium">Dark Mode</h4>
										<p class="text-muted-foreground text-sm">Use dark theme for the interface</p>
									</div>
									<input
										type="checkbox"
										name="darkMode"
										class="border-input text-primary focus:ring-ring h-4 w-4 rounded transition-colors"
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
				class="bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				← Back to Dashboard
			</a>
		</div>
	</div>
</div>
