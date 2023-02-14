import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: '*',
		methods: 'GET,PUT,POST,DELETE,OPTIONS',
		allowedHeaders: 'Content-Type,Authorization',
		exposedHeaders: 'Content-Type,Authorization',
		credentials: true,
	});
	await app.listen(3000);
}
bootstrap();
