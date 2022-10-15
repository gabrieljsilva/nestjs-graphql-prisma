import { setPatternValues } from './set-pattern-values';
import { FILTERABLE_FILTER_TYPE_NAME_PATTERN } from '@constants';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { TypeMetadataStorage } from '@nestjs/graphql';
import { FieldType, filterableMetadataStorage } from '../graphql/filterable';
import { TreeNode } from '../objects';
import { PropertyMetadata } from '@nestjs/graphql/dist/schema-builder/metadata/property.metadata';

export function createGraphqlType(node: TreeNode<FieldType>) {
  const alreadyAddedType = filterableMetadataStorage.getCreatedTypeByKey(
    node.value.type.name,
  );

  if (alreadyAddedType) return;

  const typeName = setPatternValues(FILTERABLE_FILTER_TYPE_NAME_PATTERN, {
    CLASS_NAME: node.key,
  });

  const properties: PropertyMetadata[] = node.children.map((child) => {
    return {
      name: child.value.fieldName,
      schemaName: child.value.fieldName,
      target: child.parent.value.type,
      options: {
        isArray: child.value.isArray,
        arrayDepth: 1,
      },
      typeFn: () => child.value.type,
    };
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
