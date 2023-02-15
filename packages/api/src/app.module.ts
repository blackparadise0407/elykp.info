import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configurations from './configurations';
import { KC_CONNECTION } from './shared/constants';
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
				host: config.get('database.host'),
				port: config.get('database.port'),
				username: config.get('database.username'),
				password: config.get('database.password'),
				database: config.get('database.name'),
				entities: [__dirname + '../**/*.entity{.ts,.js}'],
				synchronize: false,
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
