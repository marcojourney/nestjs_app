import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Docs')
    .setDescription('The first app API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('clients')
    .addTag('roles')
    .addTag('cats')
    .addTag('owners')
    .addTag('customers')
    .addTag('bank_accounts')
    .addTag('transactions')
    .addTag('reports')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
