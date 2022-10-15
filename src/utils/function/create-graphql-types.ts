// import { Type } from '@nestjs/common';
// import { TypeMetadataStorage } from '@nestjs/graphql';
// import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';

// interface CreateGraphqlTypes {
//   typeName: string;
//   classRef: Type;
//   properties: CreateGraphqlTypes[];
// }

export function createGraphqlTypes() {
  // LazyMetadataStorage.store(() => {
  //   TypeMetadataStorage.addInputTypeMetadata({
  //     target: filterableOptionClassRef,
  //     properties: logicalOperatorRefs.map(
  //       ({ classRef, optionName, isArray }) => ({
  //         name: optionName,
  //         schemaName: optionName.toLowerCase(),
  //         target: filterableOptionClassRef,
  //         typeFn: () => classRef,
  //         options: {
  //           isArray: isArray,
  //           arrayDepth: 1,
  //           nullable: true,
  //         },
  //       }),
  //     ),
  //     name: filterOptionsTypeName,
  //     isAbstract: true,
  //   });
  // });
}
