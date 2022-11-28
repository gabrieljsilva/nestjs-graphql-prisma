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
export function DefaultTestingValue<T = any>(
  defaultValue: unknown,
): PropertyDecorator;
export function DefaultTestingValue<T = any>(
  defaultValue: unknown | (() => ClassConstructor<T>),
): PropertyDecorator {
  if (typeof defaultValue === 'function') {
    let cls = defaultValue();
    const isArray = Array.isArray(cls);
    if (isArray) {
      [cls] = cls;
    }
    const classInstance = createTestingClassInstance(cls);
    defaultValue = isArray ? [classInstance] : classInstance;
  }

  return (target, key) => {
    Expose({ groups: [TESTING_GROUP_KEY] })(target, key);
    Transform(
      ({ value, obj, key }) => getDefaultValue(value, obj, key, defaultValue),
      {
        groups: [TESTING_GROUP_KEY],
      },
    )(target, key);
  };
}
