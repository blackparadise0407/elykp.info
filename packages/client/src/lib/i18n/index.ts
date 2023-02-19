import { derived, writable } from 'svelte/store';

import { LOCALE_STORAGE_KEY } from '~/utils/constants';

import translations from './translations';

type SupportedLocale = 'en' | 'vi';

type TransVar = Record<string, any>;

const locale = writable<SupportedLocale>('en');

function translate(locale: SupportedLocale, key: string, vars: TransVar): string {
	let text = translations[locale][key];
	if (!text) return key;
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});
	return text;
}

export const t = derived(
	locale,
	(locale) =>
		(key: string, vars: TransVar = {}) =>
			translate(locale, key, vars),
);

export const setLanguage = (lang: SupportedLocale) => {
	locale.set(lang);
	if ('localStorage' in window) {
		window.localStorage.setItem(LOCALE_STORAGE_KEY, lang);
	}
};

export const initI18N = () => {
	if ('localStorage' in window) {
		setLanguage((window.localStorage.getItem(LOCALE_STORAGE_KEY) || 'en') as SupportedLocale);
	}
};
