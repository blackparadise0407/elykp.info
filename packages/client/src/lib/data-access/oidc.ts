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
	automaticSilentRenew: true,
	silent_redirect_uri: webOrigin + '/silent-renew.html',
	response_type: 'code',
	scope: 'openid profile',
	post_logout_redirect_uri: webOrigin,
});

let mgr: UserManager;

export const initOidc = () => {
	const WEB_ORIGIN = window.location.origin;
	mgr = new UserManager(settings(WEB_ORIGIN));
};

export const authStore$ = writable<AuthStore>({
	user: null,
	isLoading: true,
});

export const getUser = () => {
	return mgr
		.getUser()
		.then((user) => {
			authStore$.update((state) => ({
				...state,
				user,
			}));
		})
		.catch()
		.finally(() => {
			authStore$.update((state) => ({
				...state,
				isLoading: false,
			}));
		});
};

export const signIn = () => {
	mgr.signinRedirect();
};

export const logout = () => {
	mgr.signoutRedirect();
};

const parseToken = (user?: User | null) => {
	if (user) {
		return `${user.token_type} ${user.access_token}`;
	}
	return null;
};

export const getAccessToken = () => {
	return mgr
		.getUser()
		.then((user) => parseToken(user))
		.catch(() => null);
};

export const isAuth$ = authStore$.pipe(map((x) => !!x.user));

export const isLoading$ = authStore$.pipe(map((x) => x.isLoading));

export const user$ = authStore$.pipe(map((state) => state.user?.profile));

export const selectAccessToken$ = authStore$.pipe(map((state) => parseToken(state.user)));
