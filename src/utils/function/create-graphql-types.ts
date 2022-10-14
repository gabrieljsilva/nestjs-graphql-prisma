import { LogicalOperatorClassRefInterface } from '../../domain/interfaces/filter';
import { Type } from '@nestjs/common';
import { TypeMetadataStorage } from '@nestjs/graphql';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';

interface CreateGraphqlTypes {
  typeName: string;
  filterOptionsTypeName: string;
  logicalOperatorRefs: LogicalOperatorClassRefInterface[];
  filterableClassRef: Type;
  filterableOptionClassRef: Type;
}

export function createGraphqlTypes(params: CreateGraphqlTypes) {
  const {
    typeName,
    filterOptionsTypeName,
    logicalOperatorRefs,
    filterableClassRef,
    filterableOptionClassRef,
  } = params;

  LazyMetadataStorage.store(() => {
    logicalOperatorRefs.forEach(({ classRef }) => {
      TypeMetadataStorage.addInputTypeMetadata({
        target: classRef,
        name: classRef.name,
        isAbstract: true,
      });
    });

    TypeMetadataStorage.addInputTypeMetadata({
      target: filterableOptionClassRef,
      properties: logicalOperatorRefs.map(
        ({ classRef, optionName, isArray }) => ({
          name: optionName,
          schemaName: optionName.toLowerCase(),
          target: filterableOptionClassRef,
          typeFn: () => classRef,
          options: {
            isArray: isArray,
            arrayDepth: 1,
            nullable: true,
          },
        }),
      ),
      name: filterOptionsTypeName,
      isAbstract: true,
    });

    TypeMetadataStorage.addInputTypeMetadata({
      target: filterableClassRef,
      properties: [
        {
          name: 'filter',
          schemaName: 'filter',
          typeFn: () => filterableOptionClassRef,
          target: filterableClassRef,
          options: {
            nullable: true,
          },
        },
      ],
      name: typeName,
      description: '',
      isAbstract: true,
    });
  });
}
