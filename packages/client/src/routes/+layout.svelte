<script lang="ts">
	// top import to load tailwindcss
	import '~/app.css';

	import { onMount } from 'svelte';

	import Header from '~/components/layouts/header.svelte';
	import SnackbarProvider from '~/components/snackbar/snackbar-provider.svelte';
	import { isLoading$ } from '~/lib/data-access/oidc';
	import { initialize } from '~/utils/app-init';

	onMount(() => {
		initialize();
	});
</script>

<SnackbarProvider />

{#if $isLoading$}
	Loading...
{:else}
	<Header />
	<main class="min-h-[calc(100vh-68px)] bg-slate-50 dark:bg-neutral-900">
		<div class="app-container">
			<slot />
		</div>
	</main>
{/if}
