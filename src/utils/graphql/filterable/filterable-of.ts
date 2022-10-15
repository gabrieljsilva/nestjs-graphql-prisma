import { Type } from '@nestjs/common';
import { filterableMetadataStorage } from './filterable-metadata-storage';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { assertClassName } from '../../function';
import { TypeMetadataStorage } from '@nestjs/graphql';

export function FilterableOf(type: Type) {
  const metadataTypeTree = filterableMetadataStorage.getTypeMetadataTree(
    type.name,
  );

  LazyMetadataStorage.store(() => {
    for (const node of metadataTypeTree.postOrderTraversal()) {
      if (!node.isLeaf()) {
        node.value = assertClassName(node.value, node.value.name);
        node.key = node.value.name;

        node.children?.forEach((leaf) => {
          TypeMetadataStorage.addInputTypeMetadata({
            name: leaf.key,
            target: node.value,
          });
        });

        // TypeMetadataStorage.addInputTypeMetadata({
        //   name: type.name,
        //   properties: node.children.map((leaf) => ({
        //     name: leaf.key,
        //     schemaName: leaf.key,
        //     target: leaf.parent,
        //     options: {},
        //     typeFn: () => leaf.value,
        //   })),
        //   target: node.value,
        // });
      }
    }
  });

  return metadataTypeTree.getRoot().value;
}
