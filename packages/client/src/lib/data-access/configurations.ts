import { THEME_STORAGE_KEY } from '~/utils/constants';

import { writable } from '../store';

type SupportedTheme = 'light' | 'dark';

export const getThemeFromStorage = (): SupportedTheme => {
	if (!window) {
		return 'light';
	}
	const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
	if (!theme) return 'light';
	switch (theme as SupportedTheme) {
		case 'light':
		case 'dark':
			return theme as SupportedTheme;
		default:
			return 'light';
	}
};

export const theme$ = writable<SupportedTheme>('light');

export const setTheme = (theme: SupportedTheme) => {
	theme$.set(theme);
};

export const initConfiguration = () => {
	if (
		localStorage[THEME_STORAGE_KEY] === 'dark' ||
		(!(THEME_STORAGE_KEY in localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	// localStorage[THEME_STORAGE_KEY] = 'light';

	// localStorage[THEME_STORAGE_KEY] = 'dark';

	// localStorage.removeItem(THEME_STORAGE_KEY);
};
