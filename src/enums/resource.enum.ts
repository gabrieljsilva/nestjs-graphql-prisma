import { registerEnumType } from '@nestjs/graphql';

export enum RESOURCE {
  USER = 'USER',
  UPLOAD = 'UPLOAD',
}

registerEnumType(RESOURCE, { name: 'RESOURCE' });
