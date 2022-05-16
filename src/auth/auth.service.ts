import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
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

  async signIn(userData: AuthCredentialsDto) {
    const user = await this.getOne(userData.username);

    if (userData.password !== user.password) {
      throw new ConflictException('Invalid Password');
    }

    return 'successfully login';
  }
}
