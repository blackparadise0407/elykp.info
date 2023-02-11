<script lang="ts">
	import clsx from 'clsx';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { SNACKBAR_DURATION } from '~/constants/snackbar';
	import { dequeue, type Snackbar } from '~/lib/data-access/snackbar';

	let timeout: NodeJS.Timeout | undefined;

	export let data: Snackbar;

	function handleDequeue() {
		dequeue(data.id);
	}

	onMount(() => {
		timeout = setTimeout(() => {
			dequeue(data.id);
		}, SNACKBAR_DURATION);
	});

	onDestroy(() => {
		timeout && clearTimeout(timeout);
	});
</script>

<div
	in:fly={{ y: 100, opacity: 0, duration: 500 }}
	out:fly={{ opacity: 0, duration: 300 }}
	class={clsx(
		'relative mx-auto max-w-md w-fit min-w-[200px] pl-4 pr-8 py-2 rounded bg-white shadow',
		data.variant,
	)}
>
	{data.message}
	<button class="absolute top-1/2 right-2 -translate-y-1/2" on:click={handleDequeue}>
		<i class="bi bi-x-circle" />
	</button>
</div>

<style lang="postcss">
	.success {
		@apply text-white bg-green-500;
	}

	.error {
		@apply text-white bg-red-500;
	}

	.warning {
		@apply text-white bg-orange-500;
	}
</style>
