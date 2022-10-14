export interface EqualityOperations<T> {
  equals?: Partial<T>;
  like?: Partial<T>;
  not?: Partial<T>;
}
