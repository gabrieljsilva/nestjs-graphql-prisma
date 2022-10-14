import { Type } from '@nestjs/common';
import {
  FILTERABLE_FIELD_KEY,
  FILTERABLE_FILTER_TYPE_NAME_PATTERN,
} from '@constants';
import { filterableMetadataStorage } from '../../utils/graphql/filterable';
import { setPatternValues } from '../../utils/function';

export function FilterableEntity(name?: string) {
  return (constructor: Type) => {
    const fields = Reflect.getMetadata(FILTERABLE_FIELD_KEY, constructor);

    const typeName =
      name ||
      setPatternValues(FILTERABLE_FILTER_TYPE_NAME_PATTERN, {
        CLASS_NAME: constructor.name,
      });

    filterableMetadataStorage.setMetadata(constructor.name, {
      fields,
      typeName,
    });
  };
}
