import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field()
  @IsNumber()
  @Min(1)
  take: number;

  @Field()
  @Min(0)
  skip: number;
}
