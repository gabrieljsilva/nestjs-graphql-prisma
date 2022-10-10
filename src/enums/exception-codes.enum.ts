import { registerEnumType } from '@nestjs/graphql';

export enum EXCEPTION_CODES {
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

registerEnumType(EXCEPTION_CODES, { name: 'EXCEPTION_CODES' });
