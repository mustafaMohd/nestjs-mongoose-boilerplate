import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import passport from "passport";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// somewhere in your initialization file
app.use(helmet());
app.enableCors();


  await app.listen(3000);
}
bootstrap();
