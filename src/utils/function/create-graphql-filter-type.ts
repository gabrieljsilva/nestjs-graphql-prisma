import { setPatternValues } from './set-pattern-values';
import {
  FILTER_LOGICAL_OPERATIONS,
  FILTERABLE_FILTER_TYPE_NAME_PATTERN,
  FILTERABLE_OPTION_TYPE_NAME_PATTERN,
} from '@constants';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { TypeMetadataStorage } from '@nestjs/graphql';
import { FieldType, filterableMetadataStorage } from '../graphql/filterable';
import { TreeNode } from '../objects';
import { PropertyMetadata } from '@nestjs/graphql/dist/schema-builder/metadata/property.metadata';
import { createClassRef } from './create-class-ref';

export function createGraphQLFilterType(node: TreeNode<FieldType>) {
  const alreadyAddedType = filterableMetadataStorage.getCreatedTypeByKey(
    node.value.type.name,
  );

  if (alreadyAddedType) return;

  const operationTypeName = setPatternValues(
    FILTERABLE_OPTION_TYPE_NAME_PATTERN,
    {
      CLASS_NAME: node.key,
    },
  );

  const operationTypeRef = createClassRef(operationTypeName);

  const baseOperationProperties: PropertyMetadata[] = node.children.map(
    (child) => {
      return {
        name: child.value.fieldName,
        schemaName: child.value.fieldName,
        target: operationTypeRef,
        options: {
          isArray: child.value.isArray,
          arrayDepth: 1,
          nullable: true,
        },
        typeFn: () => child.value.type,
      };
    },
  );

  LazyMetadataStorage.store(() => {
    TypeMetadataStorage.addInputTypeMetadata({
      name: operationTypeRef.name,
      properties: baseOperationProperties,
      target: operationTypeRef,
    });
  });

  const logicalOperations = Object.entries(FILTER_LOGICAL_OPERATIONS);

  const properties: PropertyMetadata[] = logicalOperations.map(
    ([name, options]) => {
      return {
        name: name,
        schemaName: name,
        target: node.value.type,
        options: {
          isArray: options.isArray,
          arrayDepth: 1,
          nullable: true,
        },
        typeFn: () => operationTypeRef,
      };
    },
  );

  const typeName = setPatternValues(FILTERABLE_FILTER_TYPE_NAME_PATTERN, {
    CLASS_NAME: node.key,
  });

  LazyMetadataStorage.store(() => {
    TypeMetadataStorage.addInputTypeMetadata({
      name: typeName,
      properties,
      target: node.value.type,
    });
  });

  filterableMetadataStorage.defineTypeAsCreated(node.value.type);
}
