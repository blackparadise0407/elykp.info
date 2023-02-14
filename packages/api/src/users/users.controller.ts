import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll() {
		return this.usersService.findAll();
	}

	@Get(':username')
	findOne(@Param('username') username: string) {
		return this.usersService.findOne({ username });
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}
}
