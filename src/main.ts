import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVERPORT = process.env.PORT || 3000;
  console.log(`Server is running on port ${SERVERPORT}`);

 // Gera documentação da API no Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('Documentação da API do projeto')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Valida os bodys enviados nas requisições
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não definidos no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver campos extras
      transform: true, // Transforma os payloads em instâncias do DTO
    }),
  );

  // Guard para tratar requisições com/sem JWT
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(SERVERPORT);
}
bootstrap();
