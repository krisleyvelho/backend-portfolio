import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVERPORT = process.env.PORT || 3000;
  console.log(`Server is running on port ${SERVERPORT}`);
  await app.listen(SERVERPORT);
}
bootstrap();
