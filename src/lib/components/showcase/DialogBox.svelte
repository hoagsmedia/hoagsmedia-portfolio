<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let {
		open = false,
		title = 'Dialog Title',
		content = 'Dialog Content'
	}: {
		open?: boolean;
		title?: string;
		content?: string;
	} = $props();
	let isOpen = $state(open);
	$inspect('isOpen', isOpen);
	function closeDialog() {
		isOpen = false;
		console.log('Dialog closed');
	}
	function openDialog() {
		isOpen = true;
		console.log('Dialog opened');
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
