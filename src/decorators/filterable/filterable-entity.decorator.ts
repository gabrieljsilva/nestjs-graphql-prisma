import { Type } from '@nestjs/common';
import { FILTERABLE_FIELD_KEYS } from '@constants';
import { OrderableOption } from '../../enums/orderable-option.enum';
import { TypeMetadataStorage } from '@nestjs/graphql';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';

export const filterableFieldsMap = {};

export function FilterableEntity() {
  return (constructor: Type) => {
    const fields = Reflect.getMetadata(FILTERABLE_FIELD_KEYS, constructor);

    class Orderable {}

    LazyMetadataStorage.store(() => {
      TypeMetadataStorage.addInputTypeMetadata({
        target: Orderable,
        properties: fields.map((field) => ({
          name: field,
          schemaName: field,
          typeFn: () => OrderableOption,
          target: Orderable,
          options: {
            nullable: true,
          },
        })),
        name: Orderable.name,
        description: '',
        isAbstract: true,
      });
    });

    filterableFieldsMap[constructor.name] = [fields, Orderable];
  };
}
