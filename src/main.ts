import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  app.useStaticAssets(resolve(__dirname, 'images'), {
    prefix: '/file',
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('port');
  await app.listen(port);
}
bootstrap();
