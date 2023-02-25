import {
	UserManager,
	WebStorageStateStore,
	type User,
	type UserManagerSettings,
} from 'oidc-client';
import { map } from 'rxjs';

import { writable } from '../store';

interface AuthStore {
	user: User | null;
	isLoading: boolean;
}

const settings = (webOrigin: string): UserManagerSettings => ({
	userStore: new WebStorageStateStore({
		store: window.sessionStorage,
	}),
	authority: 'http://localhost:8080/realms/elykp',
	client_id: 'elykp-mm-client',
	redirect_uri: webOrigin + '/signin-callback.html',
	response_type: 'code',
	scope: 'openid profile elykp-resources-api',
	post_logout_redirect_uri: webOrigin,
	silent_redirect_uri: webOrigin + '/silent-renew.html',
	automaticSilentRenew: true,
	validateSubOnSilentRenew: true,
	loadUserInfo: false,
});

let manager: UserManager;

export const initOidc = () => {
	const WEB_ORIGIN = window.location.origin;
	manager = new UserManager(settings(WEB_ORIGIN));

	manager.events.addUserLoaded(() => {
		manager.getUser().then((user) => {
			if (user) {
				setUser(user);
			}
		});
	});

	manager.events.addSilentRenewError(() => {
		logout();
	});
};

export const authStore$ = writable<AuthStore>({
	user: null,
	isLoading: true,
});

const setUser = (user: User) => {
	authStore$.update((state) => ({
		...state,
		isLoading: false,
		user,
	}));
};

const getUser = () => {
	return manager.getUser();
};

export const signIn = () => manager.signinRedirect();

export const logout = () => manager.signoutRedirect();

export const startAuthentication = async () => {
	getUser()
		.then((user) => {
			if (user) {
				if (user.expired) {
					signIn();
				} else {
					setUser(user);
				}
			} else {
				manager.signinSilent({}).catch(() => {});
			}
		})
		.catch()
		.finally(() => {
			authStore$.update((state) => ({
				...state,
				isLoading: false,
			}));
		});
};

const parseToken = (user?: User | null) => {
	if (user) {
		return `${user.token_type} ${user.access_token}`;
	}
	return null;
};

export const getAccessToken = () => {
	return manager
		.getUser()
		.then((user) => parseToken(user))
		.catch(() => null);
};

export const isAuth$ = authStore$.pipe(map((x) => !!x.user));

export const isLoading$ = authStore$.pipe(map((x) => x.isLoading));

export const user$ = authStore$.pipe(map((state) => state.user?.profile));

export const selectAccessToken$ = authStore$.pipe(map((state) => parseToken(state.user)));
