import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";
import {SignUpDTO} from "./dto/auth.dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  public async authentication(@Req() req): Promise<any> {
    return await this.authService.authentication(req.user);
  }

  @Post('signin')
  async signIn(@Body() body): Promise<any> {
    return await this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body:SignUpDTO): Promise<any> {
    return await this.authService.signUp(body);
  }
}
