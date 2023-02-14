import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'common';
import { Request } from 'express';

type AuthUser = Omit<IUser, 'id' | 'username'> & {
	sub: string;
	preferred_username: string;
};

export const AuthUser = createParamDecorator(
	(data: keyof AuthUser | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		const user = request.user as AuthUser;

		return data ? user?.[data] : user;
	},
);
