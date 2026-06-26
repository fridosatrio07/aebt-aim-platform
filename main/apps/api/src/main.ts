import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('v1');
  const port = Number(process.env.AIM_API_PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
