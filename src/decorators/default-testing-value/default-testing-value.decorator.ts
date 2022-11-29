import { applyDecorators } from '@nestjs/common';
import { ClassConstructor, Expose, Transform } from 'class-transformer';
import * as R from 'ramda';
import { createTestingClassInstance } from '@testing';
import { TESTING_GROUP_KEY } from '@constants';

function getDefaultValue(
  value: any,
  partial: any,
  key: string,
  defaultValue: any,
) {
  if (Reflect.has(partial, key)) {
    return typeof value === 'object'
      ? R.mergeDeepLeft(value, defaultValue)
      : value;
  }
  return defaultValue;
}

export function DefaultTestingValue<T = any>(
  defaultType: () => ClassConstructor<T>,
): PropertyDecorator;
export function DefaultTestingValue(defaultValue: unknown): PropertyDecorator;
export function DefaultTestingValue<T = any>(
  defaultValue: unknown | (() => ClassConstructor<T>),
): PropertyDecorator {
  if (typeof defaultValue === 'function') {
    let classType = defaultValue();
    const isArray = Array.isArray(classType);
    if (isArray) {
      [classType] = classType;
    }
    const classInstance = createTestingClassInstance(classType);
    defaultValue = isArray ? [classInstance] : classInstance;
  }

  return applyDecorators(
    Expose({ groups: [TESTING_GROUP_KEY] }),
    Transform(
      ({ value, obj, key }) => getDefaultValue(value, obj, key, defaultValue),
      {
        groups: [TESTING_GROUP_KEY],
      },
    ),
  );
}
