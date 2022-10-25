import { FilterOperations } from '../graphql/filterable';

export class PrismaFilter<T> {
  filter: FilterOperations<T>;
  query = {};
  constructor(filter: FilterOperations<T>) {
    this.filter = filter;
  }

  getQuery() {
    if (this.filter.like) {
      this.setLikeQuery(this.filter.like);
    }

    if (this.filter.not) {
      this.setNotQuery(this.filter.not);
    }

    if (this.filter.equals) {
      this.setEqualsQuery(this.filter.equals);
    }

    return this.query;
  }

  private setLikeQuery(
    likeQuery: Partial<T> | Array<Partial<T>>,
    query = {},
    fieldName?: string,
  ) {
    for (const key in likeQuery) {
      const isObjectOrArray = typeof likeQuery[key] === 'object';
      if (isObjectOrArray) {
        this.setLikeQuery(likeQuery[key], query, key);
      } else {
        const fieldValue = {
          contains: likeQuery[key],
          mode: 'insensitive',
        };

        if (fieldName) {
          const fieldNameHasDefined = query[fieldName];
          if (!fieldNameHasDefined) {
            query[fieldName] = {};
          }
          query[fieldName][key] = fieldValue;
          continue;
        }

        query[key] = fieldValue;
      }
    }

    this.query = query;
  }

  private setNotQuery(notQuery: Partial<T>) {
    this.query['NOT'] = { ...notQuery };
  }

  private setEqualsQuery(equalsQuery: Partial<T>) {
    this.query = {
      ...this.query,
      ...equalsQuery,
    };
  }
}
