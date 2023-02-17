export interface IUser {
	id: string;
	email: string;
	email_verified: boolean;
	enabled: boolean;
	first_name: string;
	last_name: string;
	username: string;
	created_timestamp: number;
}

export interface IProfile {
	dob: string;
	phoneNumber: string;
	country: string;
	jobTitle: string;
}
