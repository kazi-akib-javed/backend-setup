import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BcryptService,
  ConversionService,
  ExceptionService,
  PermissionService,
  RequestService,
  ResponseService,
  UsersEntity,
} from "../../common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import Redis from "ioredis";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    ExceptionService,
    RequestService,
    ConversionService,
    Redis,
    ResponseService,
    BcryptService,
    ConfigService,
    PermissionService,
    UsersService,
  ],
})
export class AuthModule {}
