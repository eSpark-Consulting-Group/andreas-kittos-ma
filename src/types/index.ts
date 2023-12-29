import React from 'react';
import {DimensionValue, StyleProp, TextStyle, ViewStyle,ImageSourcePropType} from 'react-native';

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
};

export interface MyInputProps {
  label?: string;
  placeholder?: string;
  password?: boolean;
  text?: string;
  onChange?: (val: string) => void;
  onChangeText?: (value: string) => void;
  value?: string;
  width?: DimensionValue | undefined;
  style?: any;
  placeholderColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  children?: React.ReactNode;
}

export interface MyButtonProps {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  key?: string;
  chevron?: boolean;
}
