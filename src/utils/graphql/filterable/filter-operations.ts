import { EqualityOperations } from './equality-operations';

export interface FilterOperations<T> extends EqualityOperations<T> {
  or?: EqualityOperations<T>[];
  and?: EqualityOperations<T>[];
}
