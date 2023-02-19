import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (params.username) {
		return {
			username: params.username,
		};
	}

	throw error(404, 'Not found');
};
