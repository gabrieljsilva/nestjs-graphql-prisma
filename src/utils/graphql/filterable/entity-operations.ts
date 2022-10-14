import { OrderableOption } from '../../../enums/orderable-option.enum';
import { FilterOperations } from './filter-operations';

export interface EntityOperations<T> {
  filter?: FilterOperations<T>;
  sort?: Record<keyof T, OrderableOption>;
}
