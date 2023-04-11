import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get<Record<string, any>>('server');
  const port = serverConfig.port;

  console.log(port);

  await app.listen(process.env.PORT);
  Logger.log(`Application running on port ${process.env.PORT}`);
}
bootstrap();
