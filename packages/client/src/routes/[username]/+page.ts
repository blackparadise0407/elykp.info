import { error } from '@sveltejs/kit';

import { getByUsername } from '~/lib/request/api';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.username) {
		return {
			user$: getByUsername(params.username),
		};
	}

	throw error(404, 'Not found');
};
