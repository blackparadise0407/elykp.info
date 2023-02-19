import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ELYKP_CONNECTION } from '~/shared/constants';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
	name: ELYKP_CONNECTION,
	type: 'postgres',
	host: configService.get('database.elykp.host'),
	port: configService.get('database.elykp.port'),
	username: configService.get('database.elykp.username'),
	password: configService.get('database.elykp.password'),
	database: configService.get('database.elykp.name'),
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
	synchronize: false,
};

export default new DataSource(dataSourceOptions);
