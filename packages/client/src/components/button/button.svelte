<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import Spinner from '../spinner/spinner.svelte';

	type ButtonVariant = 'primary' | 'default' | 'danger' | 'text';
	type ButtonAlign = 'left' | 'center' | 'right';

	export let variant: ButtonVariant = 'default';
	export let block = false;
	export let outline = false;
	export let loading = false;
	export let disabled = false;
	export let align: ButtonAlign = 'left';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	class={clsx(
		'inline-flex items-center gap-2 px-4 py-1 rounded-lg outline-none border border-transparent transition-colors',
		'align--' + align,
		block && 'w-full',
		outline && 'outline',
		disabled && 'pointer-events-none disabled',
		variant,
	)}
	on:click={handleClick}
	{disabled}
>
	{#if loading}
		<Spinner />
	{:else}
		<slot name="icon" />
	{/if}

	<slot />
</button>

<style lang="postcss">
	.primary {
		@apply bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-100 disabled:text-gray-400;
	}

	.primary.outline {
		@apply bg-transparent border-blue-500 text-blue-500 hover:border-blue-400 hover:text-blue-400;
	}

	.default {
		@apply text-black dark:text-white border-gray-200 dark:border-white hover:border-blue-500 hover:text-blue-500;
	}

	.danger {
		@apply bg-red-500 text-white hover:bg-red-400;
	}

	.danger.outline {
		@apply bg-transparent border-red-500 text-red-500 hover:border-red-400 hover:text-red-400;
	}

	.text {
		@apply hover:bg-gray-100 dark:hover:bg-neutral-800;
	}

	.disabled {
		@apply disabled:bg-gray-100 dark:disabled:bg-neutral-600 disabled:text-gray-400 dark:disabled:text-neutral-400;
	}

	.disabled.outline {
		@apply disabled:bg-gray-100 dark:disabled:bg-neutral-600 disabled:border-gray-300  dark:disabled:border-neutral-500 disabled:text-gray-400 dark:disabled:text-neutral-400;
	}

	.align--left {
		@apply justify-start;
	}

	.align--center {
		@apply justify-center;
	}

	.align--right {
		@apply justify-end;
	}
</style>
