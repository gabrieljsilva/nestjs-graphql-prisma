export const FILTERABLE_FIELD_KEY = 'FILTERABLE:FIELD_KEYS';
export const FILTERABLE_OPERATOR_TYPE_NAME_PATTERN =
  '^CLASS_NAME$Filter^LOGICAL_OPERATOR_NAME$Operator';
export const FILTERABLE_OPTION_TYPE_NAME_PATTERN = '^CLASS_NAME$Option';
export const FILTERABLE_FILTER_TYPE_NAME_PATTERN = '^CLASS_NAME$Filter';

export const FILTER_LOGICAL_OPERATIONS: Record<string, { isArray: boolean }> = {
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
