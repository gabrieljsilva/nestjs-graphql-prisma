import { filterableMetadataStorage } from '../../utils/graphql/filterable';
import { Type } from '@nestjs/common';
import { unpackFieldTypeIfIsArray } from '../../utils/function';

export function FilterableField(fieldTypeFN?: () => Type | [Type]) {
  return (target: any, key: string) => {
    const fieldTypeMetadata = Reflect.getMetadata('design:type', target, key);

    if (fieldTypeMetadata.name === 'Array') {
      if (!fieldTypeFN) {
        throw new Error(`set @FilterableField(() => TypeName)`);
      }
    }

    const { fieldType, isArray } = unpackFieldTypeIfIsArray(fieldTypeFN);

    filterableMetadataStorage.defineTypeMetadata(target.constructor, {
      type: fieldType || fieldTypeMetadata,
      isArray: isArray,
      fieldName: key,
    });
  };
}
