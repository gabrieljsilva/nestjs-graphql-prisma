import { FILTERABLE_FIELD_KEY } from '@constants';

export function FilterableField() {
  return (target: any, key: string) => {
    const fields = Reflect.getMetadata(
      FILTERABLE_FIELD_KEY,
      target.constructor,
    );

    fields
      ? fields.push(key)
      : Reflect.defineMetadata(FILTERABLE_FIELD_KEY, [key], target.constructor);
  };
}
