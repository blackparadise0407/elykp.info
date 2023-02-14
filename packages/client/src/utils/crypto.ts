declare const md5: any;

export const createMd5Hash = (data?: string) => {
	if ('md5' in window && data) {
		return md5(data);
	}
	return '';
};
