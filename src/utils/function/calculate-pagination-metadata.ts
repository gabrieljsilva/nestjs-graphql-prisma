import { PaginationMetadata } from '../graphql';
import { OutOfRangeException } from '@exceptions';

interface CalculatePaginationMetadataParams {
  take: number;
  skip: number;
  totalItemsCount: number;
}

export function calculatePaginationMetadata({
  take,
  totalItemsCount,
  skip,
}: CalculatePaginationMetadataParams): PaginationMetadata {
  const totalPages = Math.ceil(totalItemsCount / take);
  const currentPage = Math.ceil(skip / take) + 1;
  const hasNextPage = skip + take < totalItemsCount;
  const hasPreviousPage =
    currentPage <= totalPages && currentPage > 0 && currentPage > 1;

  if (currentPage > totalPages) {
    throw new OutOfRangeException(take, skip, totalItemsCount);
  }

  const paginationMeta: PaginationMetadata = {
    totalItemsCount: totalItemsCount,
    currentPage,
    hasPreviousPage,
    hasNextPage,
    totalPages,
  };

  if (hasNextPage) {
    paginationMeta.nextPage = currentPage + 1;
  }

  if (hasPreviousPage) {
    paginationMeta.previousPage = currentPage - 1;
  }

  return paginationMeta;
}
