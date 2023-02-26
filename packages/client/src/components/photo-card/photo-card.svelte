<script lang="ts">
	import { tap } from 'rxjs';

	import { getUserInfo } from '~/lib/data-access/user-info';
	import { writable } from '~/lib/store';

	import Avatar from '../avatar/avatar.svelte';

	const userLoading$ = writable(true);

	const user$ = getUserInfo('944b3067-1d77-43ff-93c3-cbffdb988728').pipe(
		tap(() => {
			userLoading$.next(false);
		}),
	);
</script>

<div class="max-w-xl space-y-3">
	<div class="flex items-center gap-3">
		<Avatar cls="shrink-0" src={$user$?.picture} />
		<div class="flex-1 min-w-0">
			{#if $userLoading$}
				<p>Loading...</p>
			{:else}
				<p class="truncate">
					{$user$?.username ?? ''}
				</p>
			{/if}
			<small class="dark:text-neutral-500">10 hours ago</small>
		</div>
	</div>
	<img
		class="w-full rounded-sm"
		src="https://images.unsplash.com/photo-1676729880091-4c6a7e36e9f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
		alt=""
	/>
</div>
