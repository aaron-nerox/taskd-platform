import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";

/**
 * User Module
 * This Module contains service points for the user schema for creating and accessing user records on the db
 * @module MongooseModule
 * @link UserService
 */
@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
