<script lang="ts">
	import clsx from 'clsx';
	import type { IUser } from 'common';
	import type { Profile } from 'oidc-client';

	import { createMd5Hash } from '~/utils/crypto';

	type AvatarSize = 'normal' | 'small' | 'large';

	export let user: Profile | IUser;
	export let size: AvatarSize = 'normal';
	export let cls = '';
	export let src = '';

	$: url = src || `https://www.gravatar.com/avatar/${createMd5Hash(user.email)}?d=mp`;
</script>

<div class={clsx('relative rounded-full aspect-square overflow-hidden', size, cls)}>
	<img class="w-full" src={url} alt="" referrerpolicy="no-referrer" />
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
