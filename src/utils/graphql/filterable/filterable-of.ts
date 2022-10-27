import { Type } from '@nestjs/common';
import { filterableMetadataStorage } from './filterable-metadata-storage';
import { createGraphQLFilterType } from '../../function';
import { LogicalOperations } from './logical-operations';

export function FilterableOf<T = any>(type: Type) {
  const metadataTypeTree = filterableMetadataStorage.getTypeMetadataTree(
    type.name,
  );

  for (const metadataTypeNode of metadataTypeTree.postOrderTraversal()) {
    if (!metadataTypeNode.isLeaf()) {
      createGraphQLFilterType(metadataTypeNode);
    }
  }

  return metadataTypeTree.getRoot().value.type as Type<LogicalOperations<T>>;
}
