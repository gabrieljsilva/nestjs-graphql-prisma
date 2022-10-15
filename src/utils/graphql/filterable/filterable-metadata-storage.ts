import { Tree } from '../../objects';
import { Type } from '@nestjs/common';

interface FieldType {
  name: string;
  type: Type;
}

class FilterableMetadataStorage {
  private metadata: Map<string, Tree<Type>>;

  constructor() {
    this.metadata = new Map();
  }

  defineTypeMetadata(constructor: Type, field: FieldType) {
    let typeTree = this.metadata.get(constructor.name);
    if (!typeTree) {
      typeTree = new Tree<Type>(constructor.name, constructor);
    }

    const fieldTreeType = this.metadata.get(field.type.name);

    const insertedNode = typeTree.insert({
      key: field.name,
      value: field.type,
      parentNodeKey: constructor.name,
      children: fieldTreeType?.getRoot()?.children,
    });

    this.metadata.set(constructor.name, typeTree);

    return insertedNode;
  }

  getTypeMetadataTree(typeName: string) {
    return this.metadata.get(typeName);
  }

  getTypeMetadataField(typeName: string, fieldKey: string) {
    const typeTree = this.getTypeMetadataTree(typeName);
    return typeTree.find(fieldKey);
  }
}

export const filterableMetadataStorage = new FilterableMetadataStorage();
