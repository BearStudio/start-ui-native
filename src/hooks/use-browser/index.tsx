import { useMutation } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { toast } from 'sonner-native';

type BrowserVariables = {
  url: string;
  options?: WebBrowser.WebBrowserOpenOptions;
};

export const useBrowser = () => {
  return useMutation({
    mutationKey: ['browser'],
    mutationFn: ({ url, options }: BrowserVariables) =>
      WebBrowser.openBrowserAsync(url, {
        ...options,
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
      }),
    onError: (error) => {
      toast.error(error instanceof Error ? error.name : 'Browser failed');
    },
  });
};
