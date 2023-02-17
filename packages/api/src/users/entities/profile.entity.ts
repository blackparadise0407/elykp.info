import { IProfile } from 'common';
import { BaseEntity, Column, Entity, Index } from 'typeorm';

@Entity({ name: 'profile_entity' })
export class Profile extends BaseEntity implements IProfile {
	@Column({ default: '' })
	dob: string;

	@Column({ default: '' })
	phoneNumber: string;

	@Column({ default: '' })
	country: string;

	@Column({ default: '' })
	jobTitle: string;

	@Index()
	@Column()
	userId: string;
}
