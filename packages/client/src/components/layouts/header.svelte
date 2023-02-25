<script lang="ts">
	import { user$, isAuth$, signIn, logout } from '~/lib/data-access/oidc';
	import { t } from '~/lib/i18n';

	import DropdownItem from './dropdown-item.svelte';
	import Avatar from '../avatar/avatar.svelte';
	import Button from '../button/button.svelte';
	import Dropdown from '../dropdown/dropdown.svelte';
</script>

<nav
	class="h-[68px] bg:white dark:bg-neutral-900 shadow border-b border-b-transparent dark:border-b-neutral-800"
>
	<div class="h-full app-container flex items-center">
		<a href="/"><img class="w-24 lg:w-32" src="/logo.png" alt="Elykp logo" /></a>
		<div class="flex-grow" />

		{#if $isAuth$}
			{#if $user$}
				<div class="flex items-center gap-2">
					<p class="text-sm lg:text-base font-display font-medium">{$user$.name}</p>
					<Dropdown>
						<div
							slot="overlay"
							class="w-[250px] pt-2 bg-white dark:bg-neutral-800 shadow rounded-lg"
						>
							<div class="px-4 pb-2">
								<p class="font-medium text-gray-900 truncate">{$user$.name}</p>
								<a
									href={`/${$user$.preferred_username}`}
									class="block text-sm font-medium text-gray-400 truncate hover:text-gray-600 transition-colors"
									>{$user$.preferred_username}</a
								>
							</div>
							<hr />
							<div class="px-2 py-2">
								<DropdownItem>
									<i slot="icon" class="bi bi-gear" />
									{$t('settings')}
								</DropdownItem>
							</div>
							<hr />

							<div class="px-2 py-2">
								<Button block align="center" on:click={logout}>
									<i slot="icon" class="bi bi-box-arrow-right" />
									{$t('log_out')}
								</Button>
							</div>
						</div>
						<Avatar src={$user$.picture} />
					</Dropdown>
				</div>
			{/if}
		{:else}
			<div class="flex gap-2">
				<Button variant="text">{$t('sign_up')}</Button>
				<Button variant="primary" on:click={signIn}>{$t('log_in')}</Button>
			</div>
		{/if}
	</div>
</nav>
