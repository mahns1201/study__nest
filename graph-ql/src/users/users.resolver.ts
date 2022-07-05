import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from './auth/gql-auth.guard';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { LoginInput } from './dto/input/login.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './model/user';

import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String)
  test(@Args('test') test: string) {
    console.log('test => ', test);
  }

  @Mutation(() => String)
  async login(@Args('input') email: string) {
    try {
      console.log('input => ', email);
      const token = this.usersService.login(email);
      // this.usersService.login(loginInput);
      return token;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => User, { name: 'userByEmail', nullable: true })
  getUserByEmail(@Args('email') email: string): User {
    return this.usersService.getUserByEmail(email);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    console.log('createUserData => ', createUserData);
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserData);
  }
}
