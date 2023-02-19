<script lang="ts">
	import clsx from 'clsx';

	type AvatarSize = 'normal' | 'small' | 'large';

	export let size: AvatarSize = 'normal';
	export let cls = '';
	export let src = '';

	$: url = src || `/avatar-placeholder.webp`;
</script>

<div class={clsx('relative rounded-full overflow-hidden', size, cls)}>
	<img class="w-full" src={url} alt="" referrerpolicy="no-referrer" />
</div>

<style lang="postcss">
	.normal {
		@apply w-8 lg:w-10 h-8 lg:h-10;
	}

	.large {
		@apply w-10 lg:w-12 h-10 lg:h-12;
	}

	.small {
		@apply w-6 lg:w-8 h-6 lg:h-8;
	}
</style>
