<script lang="ts">
	import clsx from 'clsx';
	import type { Profile } from 'oidc-client';

	import { createMd5Hash } from '~/utils/crypto';

	type AvatarSize = 'normal' | 'small' | 'large';

	export let user: Profile;
	export let size: AvatarSize = 'normal';

	$: url =
		user.picture ?? `https://www.gravatar.com/avatar/${createMd5Hash(user.email)}?d=identicon`;
</script>

<div class={clsx('relative rounded-full aspect-square overflow-hidden', size)}>
	<img src={url} alt={user.name} referrerpolicy="no-referrer" />
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
