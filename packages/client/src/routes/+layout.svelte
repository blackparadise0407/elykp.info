<script lang="ts">
	// top import to load tailwindcss
	import '~/app.css';

	import { onMount } from 'svelte';

	import Header from '~/components/layouts/header.svelte';
	import SnackbarProvider from '~/components/snackbar/snackbar-provider.svelte';
	import { getUser, initOidc, isLoading$ } from '~/lib/data-access/oidc';

	onMount(() => {
		initOidc();
		getUser();
	});
</script>

<SnackbarProvider />

{#if $isLoading$}
	Loading...
{:else}
	<Header />
	<div class="container">
		<slot />
	</div>
{/if}
