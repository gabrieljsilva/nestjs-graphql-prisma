import { FilterOperations } from '../graphql/filterable';

export function getPrismaQueryFromFilters<T>(filter: FilterOperations<T>) {
  let query = {};

  if (filter.equals) {
    query = {
      ...query,
      ...filter.equals,
    };
  }

  if (filter.like) {
    for (const [key, value] of Object.entries(filter.like)) {
      if (!query[key]) query[key] = {};

      if (typeof value !== 'object') {
        query[key] = {
          ...query[key],
          contains: value,
          mode: 'insensitive',
        };
      }
    }
  }

  if (filter.not) {
    query['NOT'] = {
      ...filter.not,
    };
  }

  return query;
}
