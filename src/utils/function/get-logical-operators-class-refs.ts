import { Type } from '@nestjs/common';
import {
  FILTER_LOGICAL_OPERATIONS,
  FILTERABLE_OPERATOR_TYPE_NAME_PATTERN,
} from '@constants';
import { assertClassName } from './assert-class-name';
import { setPatternValues } from './set-pattern-values';

export function getLogicalOperatorsClassRefs(
  typeName: string,
  baseClass: Type,
) {
  return Object.entries(FILTER_LOGICAL_OPERATIONS).map(([name, options]) => {
    const operationOptionClassName = setPatternValues(
      FILTERABLE_OPERATOR_TYPE_NAME_PATTERN,
      {
        CLASS_NAME: typeName,
        LOGICAL_OPERATOR_NAME: name,
      },
    );

    return {
      classRef: assertClassName(baseClass, operationOptionClassName),
      optionName: name,
      isArray: options.isArray,
    };
  });
}
