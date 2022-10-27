import { LogicalOperations } from './logical-operations';

export interface EntityOperations<T> {
  filter?: LogicalOperations<T>;
}
