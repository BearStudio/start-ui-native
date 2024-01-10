import { FC, PropsWithChildren } from 'react';

import { Button, ButtonProps, Icon } from 'react-native-ficus-ui';
import {
  IconProps,
  iconFontFamilyType,
} from 'react-native-ficus-ui/lib/typescript/components/icon/icon.type';

export type ButtonIconProps = ButtonProps & {
  icon?: string;
  iconSize?: string;
  iconFamily?: iconFontFamilyType;
  iconColor?: IconProps['color'];
};

export const ButtonIcon: FC<PropsWithChildren<ButtonIconProps>> = ({
  icon,
  iconSize = 'xl',
  iconFamily = 'AntDesign',
  children,
  color = 'white',
  iconColor = 'white',
  ...rest
}) => {
  return (
    <Button
      prefix={
        icon ? (
          <Icon
            name={icon}
            fontSize={iconSize}
            fontFamily={iconFamily}
            color={iconColor}
            mr="md"
          />
        ) : undefined
      }
      color={color}
      {...rest}
    >
      {children}
    </Button>
  );
};
