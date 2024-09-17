import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Strip any properties not defined in the DTO
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are provided
    transform: true,  // Automatically transform payloads to be objects typed according to their DTOs
  }));

  await app.listen(5000);
}
bootstrap();
