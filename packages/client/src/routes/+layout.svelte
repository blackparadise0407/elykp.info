<script lang="ts">
	import '~/app.css';

	import SnackbarProvider from '~/components/snackbar/snackbar-provider.svelte';
</script>

<SnackbarProvider />
<slot />
