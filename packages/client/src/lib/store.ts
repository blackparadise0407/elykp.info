import { BehaviorSubject, type Observable } from 'rxjs';

function safeNotEqual(a: any, b: any) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

type Updater<T> = (value: T) => T;

export interface ISvelteSubject<T> extends Observable<T> {
	set(value: T): void;
	update(updater: Updater<T>): void;
}

export class SvelteSubject<T> extends BehaviorSubject<T> implements ISvelteSubject<T> {
	constructor(initialValue: T) {
		super(initialValue);
	}

	set(value: T): void {
		if (safeNotEqual(value, this.getValue())) {
			super.next(value);
		}
	}

	update(fn: Updater<T>): void {
		this.set(fn(this.getValue()));
	}
}

export function readable<T>(initialState: T): Observable<T> {
	const stateSource: SvelteSubject<T> = new SvelteSubject(initialState);
	return stateSource.asObservable();
}

export function writable<T>(initialState: T): SvelteSubject<T> {
	const stateSource: SvelteSubject<T> = new SvelteSubject(initialState);
	return stateSource;
}
