// import { map } from 'rxjs';

// import translations from './translations';
import { writable } from '../store';

type SupportedLocale = 'en' | 'vi';

const locale = writable<SupportedLocale>('en');

// function translate() {}

export const t = locale;
