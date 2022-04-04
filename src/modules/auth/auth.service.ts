import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

import { Builder } from 'builder-pattern';
import {encryptPassword} from "../../common/utils/password";
import {errorFactory} from "../../common/utils/error.factory";
import {TokenService} from "../../common/service/token.service";
import {SignInDTO, SignUpDTO, SingInResponseDTO} from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async authentication(user: User): Promise<any> {
    console.log(user);
    return await this.userService.findOneById(user.id);
  }

  public async signIn(body: SignInDTO): Promise<any> {
    const lowerCasedEmail = body.email.toLowerCase();
    const encryptedPassword = encryptPassword(body.password, body.email);

    const user = await this.userService.findOneByEmailAndPasswordOptional(
      lowerCasedEmail,
      encryptedPassword,
    );

    if (!user)
      errorFactory({
        message: "User doesn't exist or password is invalid",
        status: HttpStatus.BAD_REQUEST,
      });

    const token = this.tokenService.createAuthToken({
      id: user.id,
    });
    return new SingInResponseDTO(user, token);
  }

  public async signUp(body:SignUpDTO): Promise<User> {
    const lowerCasedEmail = body.email.toLowerCase();
    const hash = encryptPassword(body.password, lowerCasedEmail);

    const user: User = Builder<User>()
      .email(lowerCasedEmail)
      .password(hash)
        .username(body.username)
      .build();
    console.log(user);
    return await this.userService.createUser(user)
    // return await this.userRepository.create(user);
  }
}
