import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
  })
  app.use(morgan("combined"))
  app.use(cookieParser())
  await app.listen(8000);
}
bootstrap();
