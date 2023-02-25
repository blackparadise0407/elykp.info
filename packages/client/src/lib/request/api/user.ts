import type { IKeycloakUser } from 'common';

import { request } from '../request';

const ENDPOINT = '/api/users';

export const getById = (userId: string) => request<IKeycloakUser>('GET', ENDPOINT + '/' + userId);
