import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks, apiHooks } from '@/api/api-hooks';

type RepositoriesResponse = ZodiosResponseByAlias<
  ApiHooks,
  'repositoriesGetAll'
>;

export const useRepositories = (
  params = { limit: 10 },
  config: UseInfiniteQueryOptions<RepositoriesResponse, ExplicitAny> = {}
) => {
  return apiHooks.useInfiniteQuery(
    '/repositories',
    { queries: params },
    {
      ...config,
      // tell zodios to not use page as query key to allow infinite loading
      getPageParamList: () => ['cursor'],
      // get next page param has to return the next page as a query or path param
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor
          ? {
              queries: {
                cursor: lastPage.nextCursor,
              },
            }
          : undefined,
    }
  );
};
