import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(username: string): User {
    const user = this.users.find((user) => user.username === username); // +id로 쓰면 형변환을 해준다.

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found.`);
    }

    return user;
  }

  signUp(userData: AuthCredentialsDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }

  async signIn(userData: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.getOne(userData.username);

    if (userData.password !== user.password) {
      throw new ConflictException('Invalid Password');
    }

    // 로그인 성공 시, jwt 토큰 생성 (payload, secret)
    // payload에는 민감정보는 넣으면 안 된다.
    const payload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
