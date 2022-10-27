import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;
}
