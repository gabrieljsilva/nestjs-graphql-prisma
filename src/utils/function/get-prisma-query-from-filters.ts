import { EntityOperations } from '../graphql/filterable/entity-operations';

export function getPrismaQueryFromFilters(operations: EntityOperations<any>) {
  // Throw error when EQUALS and LIKE has same fields
  const { filter } = operations;

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

      query[key] = {
        ...query[key],
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  if (filter.not) {
    query['NOT'] = {
      ...filter.not,
    };
  }

  return query;
}
