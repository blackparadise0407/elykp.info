import type { IKeycloakUser } from 'common';
import { catchError, map, of, shareReplay, type Observable } from 'rxjs';

import { getById } from '../request/api';

const users = new Map<string, Observable<IKeycloakUser>>();

const flattenUserAttr = (attr: IKeycloakUser['attributes']) => {
	return Object.entries(attr).reduce((acc, [key, val]) => {
		acc = {
			...acc,
			[key]: val?.[0],
		};
		return acc;
	}, {});
};

const getEmptyUser = (userId: string) =>
	({
		email: '',
		firstName: '',
		lastName: '',
		id: userId,
		username: 'unknown',
	} as IKeycloakUser);

const getUser = (userId: string) => {
	const user = getById(userId).pipe(
		shareReplay(1),
		map((user) => ({ ...user, ...flattenUserAttr(user.attributes) })),
		catchError(() => of(getEmptyUser(userId))),
	);
	users.set(userId, user);
	return user;
};

export const getUserInfo = (userId: string) => {
	if (users.has(userId)) {
		return users.get(userId)!;
	}
	return getUser(userId);
};
