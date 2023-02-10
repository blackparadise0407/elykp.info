<script lang="ts">
	import { snackbarStore$ } from '~/lib/data-access/snackbar';

	import Snackbar from './snackbar.svelte';
</script>

<div class="fixed left-1/2 -translate-x-1/2 bottom-2 space-y-3">
	{#each $snackbarStore$ as item (item.id)}
		<Snackbar data={item} />
	{/each}
</div>
