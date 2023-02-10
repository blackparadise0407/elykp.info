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

export const snackbarStore$ = writable<Snackbar[]>([
	{
		id: '1',
		message:
			'Hello world! o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
		variant: 'success',
	},
	{ id: '2', message: 'Hello world!', variant: 'error' },
	{ id: '3', message: 'Hello world!', variant: 'warning' },
]);

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
