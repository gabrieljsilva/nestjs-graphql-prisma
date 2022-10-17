import { Type } from '@nestjs/common';
import { filterableMetadataStorage } from './filterable-metadata-storage';
import { createGraphQLFilterType } from '../../function';

export function FilterableOf(type: Type) {
  const metadataTypeTree = filterableMetadataStorage.getTypeMetadataTree(
    type.name,
  );

  for (const metadataTypeNode of metadataTypeTree.postOrderTraversal()) {
    if (!metadataTypeNode.isLeaf()) {
      createGraphQLFilterType(metadataTypeNode);
    }
  }

  return metadataTypeTree.getRoot().value.type;
}
