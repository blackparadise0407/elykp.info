import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ELYKP_CONNECTION } from '~/shared/constants';

import { Profile } from './entities/profile.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Profile], ELYKP_CONNECTION)],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
