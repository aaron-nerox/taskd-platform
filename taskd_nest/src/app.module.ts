import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TasksModule} from "./task/tasks.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
        "mongodb://mongo-db:27017/taskd_db"
    )
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
