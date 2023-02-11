<script lang="ts">
	import { signIn } from '~/lib/data-access/oidc';
	import { enqueue } from '~/lib/data-access/snackbar';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={() => enqueue('Welcome to SvelteKit')}>Enqueue</button>

<button on:click={() => signIn()}>Login</button>
