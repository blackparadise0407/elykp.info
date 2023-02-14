import type { IUser } from 'common';

import { request } from '../request';

const ENDPOINT = '/users/';

export const getByUsername = (username: string) => request<IUser>('GET', ENDPOINT + username);
