import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {UserService} from "../../user/user.service";
import {errorFactory} from "../../../common/utils/error.factory";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1_L0V3_L1TTL3_P0N135',
    });
  }

  public async validate(payload: any): Promise<any> {
    const userDTO = await this.userService.findOneByIdOptional(payload.id);
    if (!userDTO)
      errorFactory({
        message: 'Invalid token',
        status: HttpStatus.UNAUTHORIZED,
      });
    return userDTO;
  }
}
