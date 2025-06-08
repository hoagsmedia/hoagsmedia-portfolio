<script lang="ts">
	import { fade } from 'svelte/transition';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Trash } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let {
		placeholder = 'Select an option',
		maxOptions = 5
	}: {
		placeholder?: string;
		maxOptions?: number;
	} = $props();

	interface Option {
		id: number;
		value: string;
		label: string;
	}

	const options: Option[] = $state([
		{ id: 1, value: 'apple', label: 'Apple' },
		{ id: 2, value: 'banana', label: 'Banana' }
	]);

	let newOption = $state('');
	let selectedValue = $state('');
	let optionCount = $derived(options.length);

	let isLimitReached = $derived(options.length >= maxOptions);
	let optionSummary = $derived.by(() => {
		return options.map((opt) => opt.label).join(', ');
	});

	const createNewOption = () => {
		if (newOption.trim() === '' || isLimitReached) return;
		const newId = options.length > 0 ? options[options.length - 1].id + 1 : 1;
		options.push({ id: newId, value: newOption, label: newOption });
		newOption = '';
	};
	$effect(() => {
		if (selectedValue && !options.some((option) => option.value === selectedValue)) {
			selectedValue = '';
		}
	});

	const removeOption = (id: number) => {
		const index = options.findIndex((option) => option.id === id);
		if (index !== -1) {
			options.splice(index, 1);
		}
	};
	$effect(() => {
		options.forEach((option) => {
			// Directly update the value without the redundant findIndex lookup
			option.value = option.label.toLowerCase();
		});
	});
</script>

<div class="grid h-[22rem] grid-cols-1 gap-4 md:grid-cols-2">
	<!-- Select component on the left for md screens and up -->
	<div class="relative col-span-1 grid content-center justify-items-center border">
		{#if isLimitReached}
			<div class="top left absolute top-5 mb-4 rounded bg-red-100 p-4 text-red-800">
				<p class="text-sm">Maximum options limit reached ({maxOptions}).</p>
			</div>
		{/if}
		<div>
			<Select.Root
				type="single"
				bind:value={selectedValue}
				onValueChange={(value) => (selectedValue = value)}
			>
				<Select.Trigger>{placeholder}</Select.Trigger>
				<Select.Content>
					{#each options as option}
						<Select.Item value={option.value}>{option.label}</Select.Item>
					{/each}
					<Input
						type="text"
						placeholder="Add"
						bind:value={newOption}
						onkeydown={(e) => {
							if (e.key !== 'Enter') return;
							createNewOption();
						}}
					/>
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	<!-- Available options on the right for md screens and up -->
	<div class="col-span-1">
		<div class=" h-full rounded border-1 p-4">
			<h3 class="text-muted-foreground mb-3 font-medium">Available Options</h3>
			{#if options.length === 0}
				<p class="text-muted-foreground py-4 text-center italic">No options available</p>
			{:else}
				<div class="grid gap-2">
					{#each options as option}
						<div
							transition:fade
							class={cn(
								'bg-card-foreground/5 flex items-center rounded p-3',
								selectedValue === option.value ? 'bg-card-foreground/10' : ''
							)}
						>
							<div class="flex-1">
								<Input
									bind:value={option.label}
									style="background: transparent !important; border: none !important; padding: 0 !important; box-shadow: none !important;"
								/>
								<span class="text-muted-foreground ml-2 text-xs"
									>Value: {option.value.toLowerCase()}</span
								>
							</div>
							<span class="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
								>ID: {option.id}</span
							>
							<Button
								variant="ghost"
								size="icon"
								class="ml-2"
								onclick={() => removeOption(option.id)}
							>
								<Trash class="h-4 w-4" />
							</Button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.input input) {
		background: transparent !important;
		border: none !important;
	}

	/* Target focus states */
	:global(.input input:focus) {
		box-shadow: none !important;
		outline: none !important;
	}
</style>
