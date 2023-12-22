import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps, Icon } from 'react-native-ficus-ui';
import { iconFontFamilyType } from 'react-native-ficus-ui/lib/typescript/components/icon/icon.type';

export type ButtonIconProps = ButtonProps & {
  icon?: string;
  iconSize?: string;
  iconFamily?: iconFontFamilyType | undefined;
};

export const ButtonIcon: FC<PropsWithChildren<ButtonIconProps>> = ({
  icon,
  iconSize = 'xl',
  iconFamily = 'AntDesign',
  children,
  ...rest
}) => (
  <Button
    prefix={
      icon ? (
        <Icon
          name={icon}
          fontSize={iconSize}
          fontFamily={iconFamily}
          color="white"
          mr="md"
        />
      ) : undefined
    }
    {...rest}
  >
    {children}
  </Button>
);
