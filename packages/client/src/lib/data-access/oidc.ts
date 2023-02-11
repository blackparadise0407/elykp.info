import { UserManager, type UserManagerSettings } from 'oidc-client';
import { map } from 'rxjs';

import { writable } from '../store';

interface AuthStore {
	user: unknown | null;
}

const settings = (webOrigin: string): UserManagerSettings => ({
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
});

export const getUser = () => {
	mgr.getUser();
};

export const signIn = () => {
	mgr.signinRedirect();
};

export const logout = () => {
	mgr.signoutRedirect();
};

export const isAuth$ = authStore$.pipe(map((x) => !!x.user));
