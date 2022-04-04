import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserEntity} from "./entity/user.entity";
import {UserRepository} from "./repository/user.repository";
import { DB_MODELS } from "../../common/enums/model";

@Module({
  providers: [UserService, UserRepository],
  imports: [
    MongooseModule.forFeature([{name: DB_MODELS.users, schema: UserEntity}]),
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
