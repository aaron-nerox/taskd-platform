import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

/**
 * Auth module for handling login, registration, logout and authorization
 * @module UserModule
 * @module JwtModule
 * @link AuthService
 * @link AuthController
 */
@Module({
  imports: [
      UserModule,
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '30d'
        }
      })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
