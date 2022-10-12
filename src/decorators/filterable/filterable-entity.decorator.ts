import { Type } from '@nestjs/common';
import { FILTERABLE_FIELD_KEYS } from '@constants';

export const filterableFieldsMap: Record<string, string[]> = {};

export function FilterableEntity() {
  return (constructor: Type) => {
    filterableFieldsMap[constructor.name] = Reflect.getMetadata(
      FILTERABLE_FIELD_KEYS,
      constructor,
    );
  };
}
