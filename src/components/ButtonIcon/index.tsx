import { FC, PropsWithChildren } from 'react';

import { Button, ButtonProps, Icon } from 'react-native-ficus-ui';

export type ButtonIconProps = ButtonProps & {
  icon?: string;
  iconSize?: string;
  iconSet?:
    | 'Ionicons'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'Fontisto'
    | 'SimpleLineIcons';
};

export const ButtonIcon: FC<PropsWithChildren<ButtonIconProps>> = ({
  icon,
  iconSize = 'xl',
  iconSet = 'Ionicons',
  children,
  color,
  ...rest
}) => {
  return (
    <Button color={color} {...rest}>
      {icon ? (
        <Icon
          name={icon}
          size={iconSize}
          color={color}
          iconSet={iconSet}
          mr="md"
        />
      ) : undefined}
      {children}
    </Button>
  );
};
