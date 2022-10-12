import { InputType } from '@nestjs/graphql';
import { CreateFilterOf } from '../../utils/function';
import { User } from '@models';

@InputType()
export class UserFilters extends CreateFilterOf(User) {}
