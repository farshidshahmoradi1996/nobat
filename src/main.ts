import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // middlewares
  app.use(helmet());
  app.setGlobalPrefix('api/v1');

  // interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  // config swagger

  const config = new DocumentBuilder()
    .setTitle('Nobat')
    .setDescription('The Nobat API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // listen app
  await app.listen(3000);
}
bootstrap();
