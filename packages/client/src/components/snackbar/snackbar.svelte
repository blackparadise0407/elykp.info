<script lang="ts">
	import clsx from 'clsx';
	import { onDestroy, onMount } from 'svelte';
	import { dequeue, type Snackbar } from '~/lib/data-access/snackbar';

	let timeout: NodeJS.Timeout | undefined;

	export let data: Snackbar;

	function handleDequeue() {
		dequeue(data.id);
	}

	onMount(() => {
		// timeout = setTimeout(() => {
		// 	dequeue(data.id);
		// }, 5000);
	});

	onDestroy(() => {
		timeout && clearTimeout(timeout);
	});
</script>

<div
	class={clsx(
		'relative max-w-md min-w-[200px] pl-4 pr-8 py-2 rounded bg-white shadow',
		data.variant,
	)}
>
	{data.message}
	<ion-icon
		class="absolute top-1/2 -translate-y-1/2 right-3 text-xl cursor-pointer"
		name="close-circle-outline"
		on:click={handleDequeue}
	/>
</div>

<style lang="postcss">
	/* your styles go here */
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
