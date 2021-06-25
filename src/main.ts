import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
// import { ErrorConverterMiddleware } from './middleware/error-converter.middleware';
// import { ErrorhandlerMiddleware } from './middleware/errorhandler.middleware';
//import { ErrorMiddleware } from './middleware/error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // somewhere in your initialization file
  app.use(helmet());
  app.enableCors();
  // app.use(ErrorConverterMiddleware);
  // app.use(ErrorhandlerMiddleware);
  // app.use(ErrorMiddleware.errorHandler());
  await app.listen(3000);
}
bootstrap();
