import { error } from '@sveltejs/kit';
import { firstValueFrom } from 'rxjs';

import { getByUsername } from '~/lib/request/api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (params.username) {
		const user = await firstValueFrom(getByUsername(params.username));

		return {
			user,
		};
	}

	throw error(404, 'Not found');
};
