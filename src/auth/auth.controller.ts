import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll(): User[] {
    return this.authService.getAll();
  }

  @Get('/:username')
  getOne(@Param('username') username: string): User {
    return this.authService.getOne(username);
  }

  @Post('/sign-up')
  signUp(@Body() userData: AuthCredentialsDto) {
    return this.authService.signUp(userData);
  }

  @Post('/sign-in')
  signIn(
    @Body() userData: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userData);
  }

  // UseGuards: 인증 미들웨어, AuthGuard: @nestjs/passport에서 가저옴.
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req: ', req);
  }
}
