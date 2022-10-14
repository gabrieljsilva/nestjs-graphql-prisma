import { Type } from '@nestjs/common';
import { FILTERABLE_FIELD_KEYS } from '@constants';

export const filterableFieldsMap = {};

export function FilterableEntity(name?: string) {
  return (constructor: Type) => {
    const fields = Reflect.getMetadata(FILTERABLE_FIELD_KEYS, constructor);

    filterableFieldsMap[constructor.name] = [
      fields,
      name || `${constructor.name}Filter`,
    ];
  };
}
