import type { IKeycloakUser } from 'common';

import { request } from '../request';

const ENDPOINT = 'http://localhost:8080/admin/realms/elykp';

type GetByParams = {
	email?: string;
	username?: string;
	lastName?: string;
	firstName?: string;
	search?: string;
	max?: number;
};

export const getBy = (params: GetByParams, exact = true) =>
	request<IKeycloakUser[]>('GET', ENDPOINT + '/users', { max: 1, ...params, exact });

export const getById = (userId: string) =>
	request<IKeycloakUser>('GET', ENDPOINT + '/users/' + userId);
