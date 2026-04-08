import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';

import { Text } from '@/components/ui/text';

export const Version = (props: React.ComponentProps<typeof Text>) => {
  return (
    <Text variant="muted" className="text-xs font-normal" {...props}>
      Version {nativeApplicationVersion} • {nativeBuildVersion}
    </Text>
  );
};
