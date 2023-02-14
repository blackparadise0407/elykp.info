import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [ConfigModule],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
