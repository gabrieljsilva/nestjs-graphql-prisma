import { EqualityOperations } from './equality-operations';

export interface LogicalOperations<T> extends EqualityOperations<T> {
  or?: LogicalOperations<T>;
  and?: LogicalOperations<T>;
}
