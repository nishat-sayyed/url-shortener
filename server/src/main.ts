import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(5500);
}
bootstrap();
