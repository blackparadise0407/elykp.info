import { Expose } from 'class-transformer';
import { IUser } from 'common';

export class User implements IUser {
	@Expose() id: string;
	@Expose() email: string;
	@Expose() email_verified: boolean;
	@Expose() enabled: boolean;
	@Expose() first_name: string;
	@Expose() last_name: string;
	@Expose() username: string;
	@Expose() created_timestamp: number;
}
