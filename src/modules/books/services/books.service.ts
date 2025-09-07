import { useInfiniteQuery } from '@tanstack/react-query';
import { ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks } from '@/api/api-hooks';
import { api } from '@/api/generated-api';

const DEFAULT_LIMIT = 20;

export type Book = ZodiosResponseByAlias<ApiHooks, 'bookGetById'>;

export function useBooksInfinite() {
  return useInfiniteQuery(
    ['books', DEFAULT_LIMIT],
    async ({ pageParam }) =>
      api.get('/books', {
        queries: { limit: DEFAULT_LIMIT, cursor: pageParam },
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
}
