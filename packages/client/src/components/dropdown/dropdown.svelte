<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	let visible = false;
	let anchor: HTMLButtonElement | undefined;
	let bottom: number;
	let right: number;

	function initPosition() {
		const anchorRect = anchor?.getBoundingClientRect();
		bottom = anchorRect?.bottom ?? 0;
		right = window.innerWidth - (anchorRect?.right ?? 0);
	}

	$: anchor, initPosition();
</script>

<svelte:window on:resize={initPosition} />

<button bind:this={anchor} on:click={() => (visible = true)}><slot /></button>

{#if visible}
	<div
		class="fixed top-0 left-0 w-screen h-screen z-[999]"
		transition:fade
		style="--popover-top: {`${bottom}px`}; --popover-right: {`${right}px`}"
		on:click|stopPropagation={() => (visible = false)}
		on:keypress={undefined}
	>
		<div
			class="overlay absolute"
			transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
			on:click|stopPropagation
			on:keypress={undefined}
		>
			<slot name="overlay" />
		</div>
	</div>
{/if}

<style lang="postcss">
	.overlay {
		top: calc(var(--popover-top) + 10px);
		right: var(--popover-right);
	}
</style>
