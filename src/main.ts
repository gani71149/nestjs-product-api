import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('NestJS Training API')
    .setDescription('Demo API show casing DTOs, Pipes Guards and Middleware')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: /api

  await app.listen(process.env.PORT ?? 3000);
  console.log('Swagger UI -> http://localhost:3000/api')
}
bootstrap();
