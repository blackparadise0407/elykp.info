import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configurations from './configurations';
import { ELYKP_CONNECTION, KC_CONNECTION } from './shared/constants';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configurations],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			name: KC_CONNECTION,
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get('database.kc.host'),
				port: config.get('database.kc.port'),
				username: config.get('database.kc.username'),
				password: config.get('database.kc.password'),
				database: config.get('database.kc.name'),
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forRootAsync({
			name: ELYKP_CONNECTION,
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get('database.elykp.host'),
				port: config.get('database.elykp.port'),
				username: config.get('database.elykp.username'),
				password: config.get('database.elykp.password'),
				database: config.get('database.elykp.name'),
				entities: [__dirname + '../**/*.entity{.ts,.js}'],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
