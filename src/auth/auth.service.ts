import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    const user = this.users.find((user) => user.id === +id); // +id로 쓰면 형변환을 해준다.

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  create(userData: AuthCredentialsDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }
}
