import React from 'react';
import {
  DimensionValue,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ColorValue,
  KeyboardTypeOptions,
} from 'react-native';

import {Theme} from '@react-navigation/native';
import {Source} from 'react-native-fast-image';

export type MyTheme = Theme & {
  colors: {
    textSec: string;
    placeholder?: string;
    statusBar: string;
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

export interface OrderItem {
  title: string;
  image: Source;
  orderNo: string;
  tax: number;
  total: number;
  qty: number;
  date: Date;
  status: OrderStatus;
}

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
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
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
  disabled?: boolean;
}

export type categoryProps = {
  id: string;
  name: string;
};

export type catalogItemProps = {
  id?: string;
  name: string;
  productImage: string | Source;
  price: string;
  fav: boolean;
  tags?: string;
  description?: string;
};

export type MyCatalogProps = {
  catalogName: string;
  catalogItems: {
    id: string;
    product: catalogItemProps;
  }[];
  onSeeAllPress: () => void;
  onFavPress?: (id: string, add: boolean) => void;
  favorites: string[];
  listEmptyText?: string;
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

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface UserInfoAddr extends UserInfo {
  street: 'string';
  city: 'string';
  state: 'string';
  country: 'string';
  zipCode: 'string';
  apartment: 'string';
  block: 'string';
  longitude: 'string';
  latitude: 'string';
}
