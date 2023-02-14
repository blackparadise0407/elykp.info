import qs, { type StringifyOptions } from 'query-string';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import { selectAccessToken$ } from '../data-access/oidc';
import { enqueue } from '../data-access/snackbar';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = 'http://localhost:3000';

const stringifyOptions: StringifyOptions = {
	arrayFormat: 'comma',
	skipNull: true,
	skipEmptyString: true,
};

export const request = <TData>(method: Method, url: string, data?: unknown) => {
	let _url = url.startsWith('/') ? BASE_URL + url : url;

	const requestInit: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (data) {
		if (method === 'GET' && data) {
			_url = url + qs.stringify(data, stringifyOptions);
		} else {
			requestInit.body = JSON.stringify(data);
		}
	}

	return selectAccessToken$.pipe(
		switchMap((accessToken) => {
			if (accessToken) {
				requestInit.headers!['Authorization'] = accessToken;
			}
			return fromFetch(_url, requestInit).pipe(
				switchMap((response) => {
					if (response.ok) {
						return response.json() as Promise<TData>;
					}
					return throwError(() => new Error('Something went wrong'));
				}),
				catchError((error) => {
					enqueue(error.message);
					return of(null);
				}),
			);
		}),
	);
};
