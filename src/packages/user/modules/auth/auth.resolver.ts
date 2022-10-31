import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ActivateAccountDto, LoginDto } from '@dtos';
import { Credentials } from '@models';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('loginInput') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation(() => Credentials)
  async activateAccount(
    @Args('activateAccountInput') activateAccountDto: ActivateAccountDto,
  ) {
    return this.authService.activateAccount(activateAccountDto);
  }
}
