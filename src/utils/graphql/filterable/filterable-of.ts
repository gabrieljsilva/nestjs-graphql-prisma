import { Type } from '@nestjs/common';
import { filterableMetadataStorage } from './filterable-metadata-storage';
import { createGraphqlType } from '../../function';

export function FilterableOf(type: Type) {
  const metadataTypeTree = filterableMetadataStorage.getTypeMetadataTree(
    type.name,
  );

  for (const node of metadataTypeTree.postOrderTraversal()) {
    if (!node.isLeaf()) {
      if (filterableMetadataStorage.getCreatedTypeByKey(node.key)) {
        continue;
      }
      createGraphqlType(node);
    }
  }

  return metadataTypeTree.getRoot().value.type;
}
