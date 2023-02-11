<script lang="ts">
	import { snackbarStore$ } from '~/lib/data-access/snackbar';

	import Snackbar from './snackbar.svelte';
</script>

<div class="fixed left-1/2 -translate-x-1/2 bottom-5 space-y-3 transform-gpu">
	{#each $snackbarStore$ as item (item.id)}
		<Snackbar data={item} />
	{/each}
</div>
