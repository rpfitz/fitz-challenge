import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableCors({
    origin: process.env.FRONT_HOST,
  });
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
