import { writable } from '../store';

export type SnackbarVariant = 'success' | 'warning' | 'error';

export interface Snackbar {
	id: string;
	message: string;
	variant: SnackbarVariant;
}

interface EnqueueOptions {
	variant?: SnackbarVariant;
}

export interface EnqueueFn {
	(message: string, opts?: EnqueueOptions): void;
}

export const snackbarStore$ = writable<Snackbar[]>([]);

export const enqueue: EnqueueFn = (message, opts = {}) => {
	snackbarStore$.update((snackbars) => {
		const item: Snackbar = { id: String(Date.now()), message, variant: opts.variant ?? 'success' };
		return [...snackbars, item];
	});
};

export const dequeue = (id: string) => {
	snackbarStore$.update((snackbars) => {
		const foundIdx = snackbars.findIndex((snackbar) => snackbar.id === id);
		const clone = [...snackbars];
		if (foundIdx > -1) {
			clone.splice(foundIdx, 1);
		} else {
			clone.pop();
		}
		return clone;
	});
};
