import { FilterOperations } from './filter-operations';

export interface EntityOperations<T> {
  filter?: FilterOperations<T>;
}
