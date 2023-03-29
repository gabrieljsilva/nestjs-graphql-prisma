import { Type } from '@nestjs/common';
import { Args, ArgsOptions } from '@nestjs/graphql';

import { TransformFilterArgsPipe } from '../../pipes';

export const FilterArgs = (
  property: string,
  type: Type,
  options?: Omit<ArgsOptions, 'type'>,
) => {
  return (target: Record<string, unknown>, key: string, index: number) => {
    Args(property, { type: () => type, ...options }, TransformFilterArgsPipe)(
      target,
      key,
      index,
    );
  };
};
