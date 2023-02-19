import { initConfiguration } from '~/lib/data-access/configurations';
import { initOidc, startAuthentication } from '~/lib/data-access/oidc';
import { initI18N } from '~/lib/i18n';

export const initialize = () => {
	initOidc();
	initI18N();
	startAuthentication();
	initConfiguration();
};
