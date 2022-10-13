import { registerEnumType } from '@nestjs/graphql';

export enum OrderableOption {
  'asc' = 'asc',
  'desc' = 'desc',
}

registerEnumType(OrderableOption, { name: 'OrderableOption' });
