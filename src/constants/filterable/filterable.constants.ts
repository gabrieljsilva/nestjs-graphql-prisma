import { LogicalOperationOptions } from '../../domain/interfaces/filter';

export const FILTERABLE_OPTION_TYPE_NAME_PATTERN =
  '^CLASS_NAME$FilterOperation';
export const FILTERABLE_FILTER_TYPE_NAME_PATTERN = '^CLASS_NAME$Filter';

export const FILTER_LOGICAL_OPERATIONS: Record<
  string,
  LogicalOperationOptions
> = {
  equals: {
    isArray: false,
  },
  like: {
    isArray: false,
  },
  not: {
    isArray: false,
  },
  and: {
    isArray: true,
  },
  or: {
    isArray: true,
  },
};
