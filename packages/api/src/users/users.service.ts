import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';

import { KC_CONNECTION } from '~/shared/constants';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const critBuilder = (obj = {}) => {
	return Object.entries(obj)
		.reduce<string[]>((acc, [key, val]) => {
			if (typeof val === 'string' || typeof val === 'number') {
				acc.push(`${key}='${val}'`);
			}
			return acc;
		}, [])
		.join(' AND ');
};

@Injectable()
export class UsersService {
	constructor(@InjectDataSource(KC_CONNECTION) private readonly dataSource: DataSource) {}

	findAll(): Promise<User[]> {
		return this.dataSource.manager
			.query('SELECT * FROM user_entity')
			.then((users: any[]) =>
				plainToInstance(User, users, {
					excludeExtraneousValues: true,
				}),
			)
			.catch(() => []);
	}

	findOne(crit: Partial<User> = {}): Promise<User | null> {
		const _crit = critBuilder(crit);
		const condition = _crit ? ` WHERE ${_crit} LIMIT 1` : '';
		return this.dataSource.manager
			.query('SELECT * FROM user_entity' + condition)
			.then((users) => {
				if (users.length) {
					return plainToInstance(User, users[0], {
						excludeExtraneousValues: true,
					});
				}
				return null;
			})
			.catch(() => null);
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		JSON.stringify(updateUserDto);
		return `This action updates a #${id} user`;
	}
}
