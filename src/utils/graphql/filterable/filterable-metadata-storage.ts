import { Tree } from '../../objects';
import { Type } from '@nestjs/common';

export interface FieldType {
  fieldName: string;
  type: Type;
  isArray: boolean;
}

class FilterableMetadataStorage {
  private metadata: Map<string, Tree<FieldType>>;
  private createdTypesRefs: Type[];

  constructor() {
    this.metadata = new Map();
    this.createdTypesRefs = [];
  }

  defineTypeMetadata(
    constructor: Type,
    field: Omit<FieldType, 'alreadyCreated'>,
  ) {
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

  getTypeMetadataField(typeName: string, fieldKey: string) {
    const typeTree = this.getTypeMetadataTree(typeName);
    return typeTree.find(fieldKey);
  }

  defineTypeAsCreated(type: Type) {
    const createdTypeAlreadyAdded = this.getCreatedTypeByKey(type.name);

    if (createdTypeAlreadyAdded) {
      throw new Error(`type: ${type.name} already created`);
    }

    this.createdTypesRefs.push(type);
  }

  getCreatedTypeByKey(typeName: string) {
    return this.createdTypesRefs.find((typeRef) => typeRef.name === typeName);
  }
}

export const filterableMetadataStorage = new FilterableMetadataStorage();
