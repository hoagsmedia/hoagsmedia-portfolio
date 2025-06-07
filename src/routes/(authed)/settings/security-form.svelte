<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { updatePasswordSchema, type UpdatePasswordSchema } from './settings-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	type Message = { status: 'error' | 'success' | 'warning'; text: string };

	let { data }: { data: { form: SuperValidated<Infer<UpdatePasswordSchema>, Message> } } = $props();

	let isUpdatingPassword = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(updatePasswordSchema),
		resetForm: false,
		onError: (form) => {
			console.error('Form submission error:', form);
		},
		onUpdated({ form }) {
			if (form.message) {
				toast.success(form.message.text, {
					description: form.message.status,
					action: {
						label: 'Close',
						onClick: () => {
							console.log('Toast closed');
						}
					}
				});
			}
		}
	});

	const { form: formData, enhance, message } = form;
</script>

<Toaster />
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
						<p class="text-muted-foreground text-sm">Update your account password</p>
					</div>
					<Button variant="outline" onclick={() => (isUpdatingPassword = !isUpdatingPassword)}>
						{isUpdatingPassword ? 'Cancel' : 'Update Password'}
					</Button>
				</div>

				{#if isUpdatingPassword}
					<form method="POST" action="?/updatePassword" use:enhance class="mt-6">
						<div>
							<Form.Field {form} name="currentPassword">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Current Password</Form.Label>
										<Input type="password" {...props} bind:value={$formData.currentPassword} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div>
							<Form.Field {form} name="password">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>New Password</Form.Label>
										<Input type="password" {...props} bind:value={$formData.password} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div>
							<Form.Field {form} name="confirmPassword">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Confirm New Password</Form.Label>
										<Input type="password" {...props} bind:value={$formData.confirmPassword} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="flex space-x-3">
							<Form.Button type="submit">Update Password</Form.Button>
							<Button variant="outline" onclick={() => (isUpdatingPassword = !isUpdatingPassword)}>
								{isUpdatingPassword ? 'Cancel' : 'Update Password'}
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
