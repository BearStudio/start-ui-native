import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { toast } from 'sonner-native';

type UseBrowserMutationParameters = {
  url: string;
  options?: WebBrowser.WebBrowserOpenOptions;
};

export const useBrowser = (
  mutationOptions?: UseMutationOptions<
    WebBrowser.WebBrowserResult,
    Error,
    UseBrowserMutationParameters
  >
) => {
  const mutation = useMutation({
    ...mutationOptions,
    mutationFn: async ({ options, url }) => {
      return WebBrowser.openBrowserAsync(url, {
        ...options,
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
      });
    },
    onError: (error, ...params) => {
      toast.error(error.name);
      mutationOptions?.onError?.(error, ...params);
    },
  });

  return {
    ...mutation,
    open: (
      url: string,
      options?: WebBrowser.WebBrowserOpenOptions,
      mutationOptions?: MutateOptions<
        WebBrowser.WebBrowserResult,
        Error,
        UseBrowserMutationParameters
      >
    ) => mutation.mutate({ url, options }, mutationOptions),
  };
};
