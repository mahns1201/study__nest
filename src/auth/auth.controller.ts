import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
  signIn(@Body() userData: AuthCredentialsDto) {
    return this.authService.signIn(userData);
  }
}
