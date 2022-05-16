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

  @Get('/:id')
  getOne(@Param('id') userId: number): User {
    return this.authService.getOne(userId);
  }

  @Post()
  create(@Body() userData: AuthCredentialsDto) {
    return this.authService.create(userData);
  }
}
