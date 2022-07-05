import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { LoginInput } from './dto/input/login.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './model/user';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private jwtService: JwtService) {}

  async login(email: string) {
    console.log('email, ', email);
    const user = await this.getUserByEmail(email);
    console.log('user => ', user);

    if (user) {
      // const { ...result } = user;
      const payload = { username: user.email, sub: user.userId };
      console.log('payload => ', payload);
      return this.jwtService.sign(payload);
    }
    // return 'test';
  }

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );

    Object.assign(user, updateUserData);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
