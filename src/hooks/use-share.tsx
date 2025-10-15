import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Share, ShareAction, ShareContent, ShareOptions } from 'react-native';
import { toast } from 'sonner-native';

export const useShare = (
  mutationOptions?: UseMutationOptions<ShareAction, Error, ShareContent>
) => {
  return useMutation({
    ...mutationOptions,
    mutationFn: async ({
      options,
      ...content
    }: ShareContent & { options?: ShareOptions }) => {
      return Share.share(content, options);
    },
    onError: (error, ...params) => {
      toast.error(error.name);
      mutationOptions?.onError?.(error, ...params);
    },
  });
};
