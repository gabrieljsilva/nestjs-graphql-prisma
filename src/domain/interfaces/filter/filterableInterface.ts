import { OrderableOption } from '../../../enums/orderable-option.enum';

export interface FilterableInterface<T> {
  EQUALS: T;
  LIKE: T;
  NOT: T;
  AND: T;
  OR: T;
  ORDER: Record<keyof T, OrderableOption>;
}
