<script lang="ts">
	import Avatar from '~/components/avatar/avatar.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
</script>

<svelte:head>
	<title>{user.username}</title>
</svelte:head>

<div class="py-5 grid grid-cols-12 gap-5">
	<div class="col-span-8">
		<div class="rounded-xl bg-white shadow-sm overflow-hidden">
			<div
				class="bg-orange-500 h-36 bg-center bg-no-repeat bg-cover"
				style="background-image: url(https://images.unsplash.com/photo-1505598872760-6090aa9ed603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60);"
			/>
			<div class="p-5 md:p-8 space-y-1">
				<Avatar cls="!w-[100px] -mt-20 border-4 border-white " {user} />
				<h1 class="font-semibold text-base md:text-lg">{user.first_name} {user.last_name}</h1>
				<p class="text-sm text-gray-500">Los Angeles, United States</p>
				<p>@{user.username}</p>
			</div>
		</div>
	</div>
	<div class="col-span-4">olk</div>
</div>
