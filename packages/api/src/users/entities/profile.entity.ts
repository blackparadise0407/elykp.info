import { IProfile } from 'common';
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'profile_entity' })
export class Profile extends BaseEntity implements IProfile {
	@Index({ unique: true })
	@PrimaryColumn({ name: 'user_id' })
	userId: string;

	@Column({ default: '' })
	dob: string;

	@Column({ name: 'phone_number', default: '' })
	phoneNumber: string;

	@Column({ default: '' })
	country: string;

	@Column({ default: '' })
	jobTitle: string;
}
