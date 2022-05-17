import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // private userRepository: UserRepository,
  //  @InjectRepository(UserRepository) // DB 사용하면, UserRepository 주입 해야함.
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: 'SuperMahnsSecreteCode',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.authService.getOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
