<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	import { profileSchema, type ProfileSchema } from './settings-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	type Message = { status: 'error' | 'success' | 'warning'; text: string };

	let { data }: { data: { form: SuperValidated<Infer<ProfileSchema>, Message> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(profileSchema),
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

	function handleSubmit() {
		console.log('Submit button clicked');
		// The form should still submit normally
	}
</script>

<Toaster />
<form method="POST" action="?/updateProfile" use:enhance class="mt-6">
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="sm:col-span-1">
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>UserName</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="sm:col-span-1">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input type="email" {...props} bind:value={$formData.email} required />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>
	<div class="mt-6">
		<button
			type="submit"
			class="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 font-medium sm:w-auto"
			onclick={handleSubmit}
		>
			Update Profile
		</button>
	</div>
</form>
