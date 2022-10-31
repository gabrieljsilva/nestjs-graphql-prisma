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
import { PaginationInput } from '../../../../utils/graphql';
import { UserPaginated } from '../../../../domain/paginations';
import { UserFilters } from '../../../../domain/filterables';
import { IsPublic, RequirePermissions } from '@decorators';
import { PERMISSIONS } from '@enums';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @RequirePermissions(PERMISSIONS.CAN_UPDATE_USER)
  @Mutation(() => User)
  updateUserById(@Args('updateUserById') updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(updateUserDto);
  }

  @RequirePermissions(PERMISSIONS.CAN_DELETE_USER)
  @Mutation(() => Boolean)
  deleteUserById(@Args('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @RequirePermissions(PERMISSIONS.CAN_GET_USERS)
  @Query(() => UserPaginated)
  getManyUsers(
    @Args('pagination') paginationInput: PaginationInput,
    @Args('filters', { nullable: true }) filter: UserFilters,
  ): Promise<UserPaginated> {
    return this.userService.getManyUsers(paginationInput, filter);
  }

  @RequirePermissions(PERMISSIONS.CAN_GET_USERS)
  @Query(() => User)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ResolveField(() => Credentials)
  credentials(@Parent() user: User) {
    return this.userService.getCredentialsByUserId(user.id);
  }
}
