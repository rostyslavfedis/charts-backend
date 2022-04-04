import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import {TokenService} from "../../common/service/token.service";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '1_L0V3_L1TTL3_P0N135',
      signOptions: {
        expiresIn: 604800000,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
