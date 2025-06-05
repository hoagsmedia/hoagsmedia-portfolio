<script lang="ts">
	import type { PageData } from './$types';
	import ContactForm from './contact-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto max-w-2xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-3xl font-bold">Get In Touch</h1>
		<p class="text-muted-foreground">
			Have a project in mind? Let's discuss how we can work together.
		</p>
	</div>

	<div class="bg-card rounded-lg border p-6 shadow-sm">
		<ContactForm {data} />
	</div>
</div>
