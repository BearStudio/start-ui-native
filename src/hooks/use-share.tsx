import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { Share, ShareAction, ShareContent, ShareOptions } from 'react-native';
import { toast } from 'sonner-native';

type UseShareMutationParameters = {
  content: ShareContent;
  options?: ShareOptions;
};

export const useShare = (
  mutationOptions?: UseMutationOptions<
    ShareAction,
    Error,
    UseShareMutationParameters
  >
) => {
  const mutation = useMutation({
    ...mutationOptions,
    mutationFn: async ({ options, content }) => {
      return Share.share(content, options);
    },
    onError: (error, ...params) => {
      toast.error(error.name);
      mutationOptions?.onError?.(error, ...params);
    },
  });

  return {
    ...mutation,
    open: (
      content: ShareContent,
      options?: ShareOptions,
      mutationOptions?: MutateOptions<
        ShareAction,
        Error,
        UseShareMutationParameters
      >
    ) => mutation.mutate({ content, options }, mutationOptions),
  };
};
