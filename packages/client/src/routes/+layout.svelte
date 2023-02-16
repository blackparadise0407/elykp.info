<script lang="ts">
	// top import to load tailwindcss
	import '~/app.css';

	import { onMount } from 'svelte';

	import Header from '~/components/layouts/header.svelte';
	import SnackbarProvider from '~/components/snackbar/snackbar-provider.svelte';
	import { getUser, initOidc, isLoading$ } from '~/lib/data-access/oidc';
	import { init } from '~/lib/i18n';

	onMount(() => {
		initOidc();
		init();
		getUser();
	});
</script>

<SnackbarProvider />

{#if $isLoading$}
	Loading...
{:else}
	<Header />
	<main class="bg-slate-50 min-h-[calc(100vh-68px)]">
		<div class="container">
			<slot />
		</div>
	</main>
{/if}
