import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TasksModule} from "./task/tasks.module";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
        "mongodb://mongo-db:27017/taskd_db"
    ),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
