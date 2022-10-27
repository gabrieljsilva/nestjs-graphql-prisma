import { registerEnumType } from '@nestjs/graphql';

export enum RESOURCE {
  USER = 'USER',
}

registerEnumType(RESOURCE, { name: 'RESOURCE' });
