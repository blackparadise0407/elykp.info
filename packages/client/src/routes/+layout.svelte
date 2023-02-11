<script lang="ts">
	import { onMount } from 'svelte';
	import '~/app.css';

	import SnackbarProvider from '~/components/snackbar/snackbar-provider.svelte';
	import { authStore$, getUser, initOidc } from '~/lib/data-access/oidc';

	onMount(() => {
		initOidc();
	});
</script>

<SnackbarProvider />
<slot />
