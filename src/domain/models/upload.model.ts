import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@gabrieljsilva/nestjs-graphql-filter';

@ObjectType()
export class Upload {
  @Field()
  @FilterableField()
  id: string;

  @Field()
  @FilterableField()
  originalName: string;

  @Field()
  @FilterableField()
  mimeType: string;

  @Field()
  @FilterableField()
  key: string;

  bucket: string;
}
