import { useMutation } from '@tanstack/react-query';
import { Share, ShareContent, ShareOptions } from 'react-native';
import { toast } from 'sonner-native';

type ShareVariables = {
  content: ShareContent;
  options?: ShareOptions;
};

export const useShare = () => {
  return useMutation({
    mutationKey: ['share'],
    mutationFn: ({ content, options }: ShareVariables) =>
      Share.share(content, options),
    onError: (error) => {
      toast.error(error instanceof Error ? error.name : 'Share failed');
    },
  });
};
