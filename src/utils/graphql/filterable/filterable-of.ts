import {
  InputType,
  PartialType,
  PickType,
  TypeMetadataStorage,
} from '@nestjs/graphql';
import { filterableFieldsMap } from '@decorators';
import { Type } from '@nestjs/common';
import { FilterOperations } from './filter-operations';
import { EntityOperations } from './entity-operations';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { OrderableOption } from '../../../enums/orderable-option.enum';
import { assertClassName } from '../../function';

export function FilterableOf(type: Type) {
  const [fields, name] = filterableFieldsMap[type.name];
  const classRef = PickType(PartialType(type), fields, InputType);

  type ClassType = typeof classRef;

  @InputType()
  class Filterable implements EntityOperations<ClassType> {
    filter: FilterOperations<ClassType>;
    sort: Record<keyof ClassType, OrderableOption>;
  }

  class FilterOption implements FilterOperations<ClassType> {}

  const operations = [
    {
      name: 'Equals',
      isArray: false,
    },
    {
      name: 'Like',
      isArray: false,
    },
    {
      name: 'Not',
      isArray: false,
    },
    {
      name: 'And',
      isArray: true,
    },
    {
      name: 'Or',
      isArray: true,
    },
  ];

  interface classOptionAssert {
    assertedClassRef: Type;
    optionName: string;
    isArray: boolean;
  }

  const classOptionAsserts: classOptionAssert[] = operations.map((option) => {
    return {
      assertedClassRef: assertClassName(
        classRef,
        `${name}${option.name}Operation`,
      ),
      optionName: option.name,
      isArray: option.isArray,
    };
  });

  LazyMetadataStorage.store(() => {
    classOptionAsserts.forEach(({ assertedClassRef }) => {
      TypeMetadataStorage.addInputTypeMetadata({
        target: assertedClassRef,
        name: assertedClassRef.name,
        isAbstract: true,
      });
    });

    TypeMetadataStorage.addInputTypeMetadata({
      target: FilterOption,
      properties: classOptionAsserts.map(
        ({ assertedClassRef, optionName, isArray }) => ({
          name: optionName,
          schemaName: optionName,
          target: FilterOption,
          typeFn: () => assertedClassRef,
          options: {
            isArray: isArray,
            arrayDepth: 1,
          },
        }),
      ),
      name: `${name}Options`,
      isAbstract: true,
    });

    TypeMetadataStorage.addInputTypeMetadata({
      target: Filterable,
      properties: [
        {
          name: 'filter',
          schemaName: 'filter',
          typeFn: () => FilterOption,
          target: Filterable,
          options: {
            nullable: true,
          },
        },
      ],
      name: name,
      description: '',
      isAbstract: true,
    });
  });

  return Filterable;
}
