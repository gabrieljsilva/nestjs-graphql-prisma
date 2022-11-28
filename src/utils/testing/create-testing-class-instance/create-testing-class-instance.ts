import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TESTING_GROUP_KEY } from '@constants';
import { DeepPartial } from '../../../domain/types';

export function createTestingClassInstance<T = any>(
  cls: ClassConstructor<T>,
  partial?: DeepPartial<T>,
): T {
  return plainToInstance(cls, partial ?? {}, {
    groups: [TESTING_GROUP_KEY],
  });
}
