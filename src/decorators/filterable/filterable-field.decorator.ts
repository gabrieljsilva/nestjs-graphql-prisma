import { filterableMetadataStorage } from '../../utils/graphql/filterable';

export function FilterableField() {
  return (target: any, key: string) => {
    const fieldType = Reflect.getMetadata('design:type', target, key);
    filterableMetadataStorage.defineTypeMetadata(target.constructor, {
      name: key,
      type: fieldType,
    });
  };
}
