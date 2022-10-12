import { FILTERABLE_FIELD_KEYS } from '@constants';

export function FilterableField() {
  return (target: any, key: string) => {
    const fields = Reflect.getMetadata(
      FILTERABLE_FIELD_KEYS,
      target.constructor,
    );

    fields
      ? fields.push(key)
      : Reflect.defineMetadata(
          FILTERABLE_FIELD_KEYS,
          [key],
          target.constructor,
        );
  };
}
