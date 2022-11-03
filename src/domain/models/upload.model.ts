import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@decorators';

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

  @Field()
  @FilterableField()
  url: string;

  bucket: string;
}
