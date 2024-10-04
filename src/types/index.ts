import React from 'react';
import {
  DimensionValue,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ColorValue,
  KeyboardTypeOptions,
  TextInputFocusEventData,
} from 'react-native';

import {Theme} from '@react-navigation/native';
import {Source} from 'react-native-fast-image';
import {NativeSyntheticEvent} from 'react-native';

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
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
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
  price1: string;
  price2?: string;
  fav: boolean;
  tags?: string;
  description?: string;
};

export type MyCatalogProps = {
  catalogId?: string;
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

export type SearchDataProps = {
  id: string;
  name: string;
  categoryProduct: {id: string; product: catalogItemProps}[];
};
export type orderProductProps = {
  id: string;
  quantity: string;
  product: catalogItemProps;
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
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  apartment: string;
  block: string;
  longitude: string;
  latitude: string;
  distanceOut?: number;
}

export interface OrderDetails {
  deliveryCharges: string;
  orderDetail: orderProductProps[];
  orderNumber: string;
  subTotal: string;
  total: string;
}

//---------- Order Types

export interface OrderItem {
  id: string;
  orderNumber: string;
  orderStatus: ItemStatus;
  total: string;
  subTotal: string;
  shippingType: 'standard' | 'express';
  deliveryCharges: string;
  note: string;
  deliveryDate: Date;
  orderState: string;
  orderDetail: OrderDetail[];
  payment: Payment;
  user: User;
}

interface ItemStatus {
  picked: boolean;
  washing: boolean;
  delivered: boolean;
  scheduled: boolean;
  pickedDate: Date;
  washingDate: Date;
  pickedReason: string;
  deliveredDate: Date;
  scheduledDate: Date;
  washingReason: string;
  deliveredReason: string;
  scheduledReason: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
}
interface Payment {
  paymentType: 'COD' | 'CARD';
  paymentStatus: 'success' | 'failed' | 'pending';
  transactionId?: string | null;
}

export interface OrderDetail {
  id: string;
  quantity: number;
  product: Product;
}

interface Product {
  id: string;
  name: string;
  price: string;
  productImage?: string;
  categoryProduct: Category[];
}

interface Category {
  id: string;
  category: {id: string; name: string};
}

export interface OrderListParams {
  page?: string;
  take?: string;
  orderState?: string;
}
