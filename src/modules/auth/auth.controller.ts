import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req, HttpStatus
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";
import { SignUpDTO, SingInResponseDTO } from "./dto/auth.dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  public async authentication(@Req() req): Promise<any> {
    const user =  await this.authService.authentication(req.user);

    return {
      data:user,
      success:true
    }
  }

  @Post('signin')
  async signIn(@Body() body): Promise<any> {
    const user =  await this.authService.signIn(body);

    if (!user){
      return {
        message: "User doesn't exist or password is invalid",
        success:false
      }
    }else{
      return {
        data:user,
        success:true
      }
    }

  }

  @Post('signup')
  async signUp(@Body() body:SignUpDTO): Promise<any> {
    const user = await this.authService.signUp(body);

    return {
      data:user,
      success:true
    }
  }
}
