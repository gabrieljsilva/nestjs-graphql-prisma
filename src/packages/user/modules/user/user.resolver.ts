import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Credentials, User } from '@models';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@dtos';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => User)
  updateUserById(@Args('updateUserById') updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(updateUserDto);
  }

  @Mutation(() => Boolean)
  deleteUserById(@Args('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Query(() => User)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ResolveField(() => Credentials)
  credentials(@Parent() user: User) {
    return this.userService.findCredentialsByUserId(user.id);
  }
}
