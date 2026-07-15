import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;
// const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const CLIENT_URL = 'http://localhost:5173';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(PORT);

  console.log(`Server running at http://localhost:${PORT}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
