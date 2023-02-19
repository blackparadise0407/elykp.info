import qs, { type StringifyOptions } from 'query-string';
import { switchMap, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import { selectAccessToken$ } from '../data-access/oidc';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = 'http://localhost:8081';

const ERROR_MSG = 'Something went wrong';

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
		mode: 'cors',
	};

	if (data) {
		if (method === 'GET' && data) {
			_url = url + '?' + qs.stringify(data, stringifyOptions);
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
					return throwError(() => new Error(ERROR_MSG));
				}),
			);
		}),
	);
};
