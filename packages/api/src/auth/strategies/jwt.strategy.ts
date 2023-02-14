import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as JwksClient from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKeyProvider: JwksClient.passportJwtSecret({
				jwksUri: config.get('oidc.authority') + '/protocol/openid-connect/certs',
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				cache: true,
			}),
			issuer: config.get('oidc.authority'),
		});
	}

	public validate(payload: any) {
		return payload;
	}
}
