<script lang="ts">
	import { firstValueFrom, map } from 'rxjs';

	import Avatar from '~/components/avatar/avatar.svelte';
	import { t } from '~/lib/i18n';
	import { getBy } from '~/lib/request/api';

	import type { PageData } from './$types';

	export let data: PageData;

	$: getUser = firstValueFrom(getBy({ username: data.username }).pipe(map((users) => users[0])));
</script>

<svelte:head>
	<title>{data.username}</title>
</svelte:head>

{#await getUser}
	Loading
	<!-- promise is pending -->
{:then user}
	{#if !user}
		{$t('page_not_found')}
	{:else}
		<div class="py-5 grid grid-cols-12 gap-5">
			<div class="col-span-12">
				<div class="box no-padding">
					<div
						class="bg-orange-500 h-36 bg-center bg-no-repeat bg-cover"
						style="background-image: url(https://images.unsplash.com/photo-1505598872760-6090aa9ed603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60);"
					/>
					<div class="p-5 md:p-8 space-y-1">
						<Avatar
							cls="!w-[100px] -mt-20 border-4 border-white"
							src={user.attributes?.picture?.[0]}
						/>
						<h1 class="font-semibold text-base md:text-lg">{user.firstName} {user.lastName}</h1>
						<p class="text-sm text-gray-500">Los Angeles, United States</p>
						<p>@{user.username}</p>
					</div>
				</div>
			</div>
			<div class="col-span-8"><div class="box">OK</div></div>

			<div class="col-span-4">
				<div class="box">AOk</div>
			</div>
		</div>
	{/if}
{:catch aa}
	<div>No User {aa}</div>
{/await}

<!-- {#if !$user$}
	{$t('page_not_found')}
{:else}
	<div class="py-5 grid grid-cols-12 gap-5">
		<div class="col-span-12">
			<div class="box no-padding">
				<div
					class="bg-orange-500 h-36 bg-center bg-no-repeat bg-cover"
					style="background-image: url(https://images.unsplash.com/photo-1505598872760-6090aa9ed603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60);"
				/>
				<div class="p-5 md:p-8 space-y-1">
					<Avatar cls="!w-[100px] -mt-20 border-4 border-white" />
					<h1 class="font-semibold text-base md:text-lg">{$user$.firstName} {$user$.lastName}</h1>
					<p class="text-sm text-gray-500">Los Angeles, United States</p>
					<p>@{$user$.username}</p>
				</div>
			</div>
		</div>
		<div class="col-span-8"><div class="box">OK</div></div>

		<div class="col-span-4">
			<div class="box">AOk</div>
		</div>
	</div>
{/if} -->
<style lang="postcss">
	.box {
		@apply p-5 md:p-8 rounded-xl bg-white shadow-sm overflow-hidden;
	}
	.box.no-padding {
		@apply p-0;
	}
</style>
