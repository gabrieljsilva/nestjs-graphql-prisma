import { Type } from '@nestjs/common';
import { FilterOperations } from './filter-operations';
import { EntityOperations } from './entity-operations';
import {
  createGraphqlTypes,
  getLogicalOperatorsClassRefs,
  setPatternValues,
} from '../../function';
import { filterableMetadataStorage } from './filterable-metadata-storage';
import { createClassTypeRef } from '../../function/create-class-type-ref';
import { FILTERABLE_OPTION_TYPE_NAME_PATTERN } from '@constants';

export function FilterableOf(type: Type) {
  const { fields, typeName: refTypeName } =
    filterableMetadataStorage.getMetadata(type.name);
  const classTypeRef = createClassTypeRef(type, fields);
  const filterOptionsTypeName = setPatternValues(
    FILTERABLE_OPTION_TYPE_NAME_PATTERN,
    { CLASS_NAME: refTypeName },
  );

  type ClassType = typeof classTypeRef;

  class Filterable implements EntityOperations<ClassType> {}
  class FilterOption implements FilterOperations<ClassType> {}

  const logicalOperatorsClassRefs = getLogicalOperatorsClassRefs(
    refTypeName,
    classTypeRef,
  );

  createGraphqlTypes({
    typeName: type.name,
    logicalOperatorRefs: logicalOperatorsClassRefs,
    filterableClassRef: Filterable,
    filterableOptionClassRef: FilterOption,
    filterOptionsTypeName,
  });

  return Filterable;
}
