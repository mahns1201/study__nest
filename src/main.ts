import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  // pipes -> parameter-level, handler-level, global-level
  // built-in pipes -> ValidationPipe, ParseIntPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe, DefaultValuePipe
  app.useGlobalPipes(
    // TODO check more functions!
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
  Logger.log(`Application running on port: ${PORT}`);
}
bootstrap();
