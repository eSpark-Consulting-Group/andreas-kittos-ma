import React from 'react';
import {
  DimensionValue,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ColorValue,
} from 'react-native';

import {Theme} from '@react-navigation/native';

export type MyTheme = Theme & {
  colors: {
    placeholder?: string;
    positive?: string;
    negative?: string;
    focused?: string;
  };
};

export type MyTextProps = {
  text?: string;
  textColor?: string;
  style?: TextStyle;
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  size?: number;
};

export type MyBannerProps = {
  background: ImageSourcePropType;
  title1: string;
  title2?: string;
  touchable?: boolean;
  onPress?: () => void;
};

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Completed'
  | 'Cancelled'
  | 'On-hold'
  | 'Refunded'
  | 'Failed';

export interface MyInputProps {
  label?: string;
  placeholder?: string;
  password?: boolean;
  text?: string;
  onChange?: (val: string) => void;
  onChangeText?: (value: string) => void;
  width?: DimensionValue | undefined;
  style?: ViewStyle;
  placeholderColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  leftchild?: React.ReactNode;
}

export interface MyButtonProps {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: ColorValue | undefined | string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  key?: string;
  chevron?: boolean;
}

export type catalogItemProps = {
  name: string;
  image: ImageSourcePropType;
  price: string;
  fav: boolean;
};

export type MyCatalogProps = {
  catalogName: string;
  catalogItems: catalogItemProps[];
  onSeeAllPress: () => void;
};

interface ButtonProps {
  id?: number;
  label?: string;
  backgroundColor?: ColorValue | string | undefined;
  textColor?: string;
  onPress?: () => void;
}

export interface MyPopupProps {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  title?: string;
  message1?: string;
  message2?: string;
  message3?: string;
  visible?: boolean;
  style?: ViewStyle;
  buttons?: ButtonProps[];
  children?: React.ReactNode;
}
