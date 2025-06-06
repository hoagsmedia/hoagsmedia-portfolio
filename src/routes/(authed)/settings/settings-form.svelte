<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { profileSchema, type ProfileSchema } from './settings-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	type Message = { status: 'error' | 'success' | 'warning'; text: string };

	let { data }: { data: { form: SuperValidated<Infer<ProfileSchema>, Message> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(profileSchema),
		onUpdated({ form }) {
			if (form.message) {
				toast.success(form.message.text, {
					description: form.message.status == 'success' ? '✅' : '❌'
				});
			}
		},
		resetForm: false
	});

	const { form: formData, enhance } = form;
</script>

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
		<Form.Button type="submit" class="w-full sm:w-auto">Update Profile</Form.Button>
	</div>
</form>
