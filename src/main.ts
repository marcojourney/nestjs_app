import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import * as cors from 'cors';
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

  const corsOptions = {
    origin: function (origin, callback) {console.log('DDDDD:', origin);
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
      // db.loadOrigins(function (error, origins) {
      //   callback(error, origins)
      // })

      callback(null, { origin: false })
    }
  }

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });
  
  await app.listen(3000);
}

bootstrap();
