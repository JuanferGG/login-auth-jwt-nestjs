import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO Static folder para uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // TODO Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // TODO Cookies
  app.use(cookieParser());

  // TODO CORS
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });

  // TODO Crear carpeta logs si no existe
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
    console.log('📁 Carpeta "logs/" creada');
  }

  // TODO Fecha para el nombre del archivo
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const logFilePath = path.join(logsDir, `${today}.log`);
  const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  // TODO Token personalizado para body
  morgan.token('body', (req: any) => {
    return req.body && Object.keys(req.body).length > 0
      ? JSON.stringify(req.body)
      : '-';
  });

  // TODO Token personalizado para timestamp con hora local
  morgan.token('date', () => {
    const rawDate = new Date().toLocaleString('es-CO');
    return rawDate
      .replace(/\s?p\.\s?m\./i, ' p.m.')
      .replace(/\s?a\.\s?m\./i, ' a.m.');
  });

  // TODO Formato personalizado (restaurado)
  const format =
    ':date => METHOD: :method :url STATUS: :status SIZE: :res[content-length] - TIME: :response-time ms - BODY: :body';

  // TODO Logs en consola y archivo
  app.use(morgan(format, { stream: accessLogStream }));
  app.use(morgan(format)); // Consola

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
