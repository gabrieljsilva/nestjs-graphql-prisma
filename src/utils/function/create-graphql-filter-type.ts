import { setPatternValues } from './set-pattern-values';
import {
  FILTER_LOGICAL_OPERATIONS,
  FILTERABLE_ENTITY_TYPE_NAME_PATTERN,
  FILTERABLE_FILTER_TYPE_NAME_PATTERN,
  GRAPHQL_ATOMIC_TYPES,
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

  const schemaFilterableEntityName = setPatternValues(
    FILTERABLE_ENTITY_TYPE_NAME_PATTERN,
    { CLASS_NAME: node.key },
  );

  const schemaFilterableEntityRef = createClassRef(schemaFilterableEntityName);

  const schemaFilterableEntityProperties: PropertyMetadata[] =
    node.children.map((child) => {
      let type = child.value.type;

      if (!GRAPHQL_ATOMIC_TYPES.includes(child.value.type.name)) {
        const name = setPatternValues(FILTERABLE_ENTITY_TYPE_NAME_PATTERN, {
          CLASS_NAME: child?.value?.type?.name,
        });

        type = filterableMetadataStorage.getCreatedTypeByKey(name);
      }

      return {
        name: child.value.fieldName,
        schemaName: child.value.fieldName,
        target: schemaFilterableEntityRef,
        options: {
          isArray: child.value.isArray,
          arrayDepth: 1,
          nullable: true,
        },
        typeFn: () => type,
      };
    });

  LazyMetadataStorage.store(() => {
    TypeMetadataStorage.addInputTypeMetadata({
      name: schemaFilterableEntityName,
      properties: schemaFilterableEntityProperties,
      target: schemaFilterableEntityRef,
    });
  });

  const logicalOperations = Object.entries(FILTER_LOGICAL_OPERATIONS);

  const entityFilterProperties: PropertyMetadata[] = logicalOperations.map(
    ([name, options]) => {
      return {
        name: name,
        schemaName: name,
        target: schemaFilterableEntityRef,
        options: {
          nullable: true,
        },
        typeFn: () =>
          options.isComparisonOperator
            ? schemaFilterableEntityRef
            : node.value.type,
      };
    },
  );

  const typeName = setPatternValues(FILTERABLE_FILTER_TYPE_NAME_PATTERN, {
    CLASS_NAME: node.key,
  });

  LazyMetadataStorage.store(() => {
    TypeMetadataStorage.addInputTypeMetadata({
      name: typeName,
      properties: entityFilterProperties,
      target: node.value.type,
    });
  });

  filterableMetadataStorage.setTypeRefs(
    node.value.type,
    schemaFilterableEntityRef,
  );
}
