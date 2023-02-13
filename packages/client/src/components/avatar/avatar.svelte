<script lang="ts">
	import clsx from 'clsx';
	import type { Profile } from 'oidc-client';

	type AvatarSize = 'normal' | 'small' | 'large';

	export let user: Profile;
	export let size: AvatarSize = 'normal';

	const colorList = ['gray', 'blue', 'red', 'orange', 'yellow', 'purple', 'green'].map(
		(x) => `bg-${x}-500`,
	);

	$: bgColor = colorList[(user.name?.charCodeAt(0) ?? 0) % (colorList.length - 1)];
</script>

<div
	class={clsx(
		'relative grid place-content-center rounded-full aspect-square overflow-hidden',
		bgColor,
		size,
	)}
>
	{#if !user.picture}
		<p class="font-bold text-base md:text-lg text-white">{user.name?.charAt(0)}</p>
	{:else}
		<img src={user.picture} alt={user.name} />
	{/if}
</div>

<style lang="postcss">
	.normal {
		@apply w-8 lg:w-10;
	}

	.large {
		@apply w-10 lg:w-12;
	}

	.small {
		@apply w-6 lg:w-8;
	}
</style>
