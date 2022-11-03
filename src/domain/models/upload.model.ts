import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Upload {
  @Field()
  id: string;

  @Field()
  originalName: string;

  @Field()
  mimeType: string;

  @Field()
  key: string;

  @Field()
  url: string;

  bucket: string;
}
