import { Tree } from '../../objects';
import { Type } from '@nestjs/common';

export interface FieldType {
  fieldName: string;
  type: Type;
  isArray: boolean;
}

class FilterableMetadataStorage {
  private metadata: Map<string, Tree<FieldType>>;
  private typeRefsMap: Map<string, Type>;

  constructor() {
    this.metadata = new Map();
    this.typeRefsMap = new Map();
  }

  defineTypeMetadata(constructor: Type, field: FieldType) {
    let typeTree = this.metadata.get(constructor.name);

    if (!typeTree) {
      typeTree = new Tree<FieldType>(constructor.name, {
        isArray: false,
        type: constructor,
        fieldName: constructor.name,
      });
    }

    const fieldTreeType = this.metadata.get(field.type.name);

    const insertedNode = typeTree.insert({
      key: field.type.name,
      value: {
        type: field.type,
        isArray: field.isArray,
        fieldName: field.fieldName,
      },
      parentNodeKey: constructor.name,
      children: fieldTreeType?.getRoot()?.children,
    });

    this.metadata.set(constructor.name, typeTree);

    return insertedNode;
  }

  getTypeMetadataTree(typeName: string) {
    return this.metadata.get(typeName);
  }

  setTypeRef(type: Type) {
    const createdTypeAlreadyAdded = this.getCreatedTypeByKey(type.name);
    if (createdTypeAlreadyAdded) {
      throw new Error(`type: ${type.name} already created`);
    }
    this.typeRefsMap.set(type.name, type);
  }

  setTypeRefs(...types: Type[]) {
    for (const type of types) {
      this.setTypeRef(type);
    }
  }

  getCreatedTypeByKey(typeName: string) {
    return this.typeRefsMap.get(typeName);
  }
}

export const filterableMetadataStorage = new FilterableMetadataStorage();
