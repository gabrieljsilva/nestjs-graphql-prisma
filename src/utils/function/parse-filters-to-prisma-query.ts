import { FilterInterface } from '../../domain/interfaces/filter';

export function parseFiltersToPrismaQuery(filters: FilterInterface<any>) {
  let query = {};
  if (filters.EQUALS) {
    query = {
      ...query,
      ...filters.EQUALS,
    };
  }

  if (filters.LIKE) {
    for (const [key, value] of Object.entries(filters.LIKE)) {
      if (!query[key]) query[key] = {};

      query[key] = {
        ...query[key],
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  if (filters.NOT) {
    query['NOT'] = {
      ...filters.NOT,
    };
  }

  return query;
}
