import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL ?? '',
    ].filter(Boolean),
    credentials: true,
  });

  // Global validation using Zod schemas
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableShutdownHooks();
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port, '0.0.0.0');
}
//eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
