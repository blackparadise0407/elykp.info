<script lang="ts">
	import { user$, isAuth$, signIn, logout } from '~/lib/data-access/oidc';

	import Avatar from '../avatar/avatar.svelte';
	import Dropdown from '../dropdown/dropdown.svelte';
</script>

<nav class="shadow">
	<div class="h-[68px] container flex items-center">
		<a href="/"><img class="w-24 lg:w-32" src="/logo.png" alt="Elykp logo" /></a>
		<div class="flex-grow" />

		{#if $isAuth$}
			{#if $user$}
				<div class="flex items-center gap-2">
					<p>{$user$.name}</p>
					<Dropdown>
						<div slot="overlay" class="pt-2 bg-white shadow rounded-lg">
							<div class="px-4 pb-2">
								<p class="font-medium text-gray-900">{$user$.email}</p>
								<a
									href={`/${$user$.preferred_username}`}
									class="text-sm text-gray-400 hover:underline underline-offset-2"
									>@{$user$.preferred_username}</a
								>
							</div>
							<hr />
							<div class="px-4 py-2" />
							<hr />
							<ul>
								<li class="px-4 py-1.5 hover:bg-gray-100 transition-colors">logout</li>
								<li
									class="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-100 transition-colors"
									on:click={logout}
									on:keypress={undefined}
								>
									<i class="bi bi-box-arrow-right" />
									logout
								</li>
							</ul>
						</div>
						<Avatar user={$user$} />
					</Dropdown>
				</div>
			{/if}
		{:else}
			<button on:click={signIn}>Login</button>
		{/if}
	</div>
</nav>
