<script lang="ts">
	import clsx from 'clsx';
	import { onDestroy, onMount } from 'svelte';

	import type { Snackbar } from '~/lib/data-access/snackbar';

	let timeout: NodeJS.Timeout | undefined;

	export let data: Snackbar;

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
