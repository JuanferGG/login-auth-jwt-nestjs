import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO: Static Folder for img's, csv's, pdf's, etc.
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // TODO : Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // TODO: Cookie Parser
  app.use(cookieParser());

  // TODO : CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // TODO : MORGAN status peticiones
morgan.token('body', (req: any) => JSON.stringify(req.body));
  app.use(
    morgan(
      ':method :url STATUS: :status SIZE: :res[content-length] - TIME: :response-time ms - BODY: :body',
    )
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
