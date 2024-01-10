import React, {memo} from 'react';
import {Text, TextStyle, TextProps} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyTextProps} from '../../types';

type Fonts =
  | 'Inter-Bold'
  | 'Inter-SemiBold'
  | 'Inter-Medium'
  | 'Inter-Regular'
  | 'Inter-Light'
  | 'Inter-Regular';

function MyText({
  text,
  children,
  textColor,
  weight,
  size,
  style,
  numberOfLines,
}: MyTextProps & TextProps) {
  const theme = useTheme();
  const getFontFamily = (weight: string): Fonts => {
    switch (weight) {
      case '700':
        return 'Inter-Bold';
      case '600':
        return 'Inter-SemiBold';
      case '500':
        return 'Inter-Medium';
      case '400':
        return 'Inter-Regular';
      case '300':
        return 'Inter-Light';
      default:
        return 'Inter-Regular';
    }
  };
  const textStyle: TextStyle = {
    color: textColor || theme.colors.text,
    fontWeight: weight || 'normal',
    fontSize: size || 14,
    fontFamily: weight ? getFontFamily(weight) : 'Inter-Regular',
  };

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {children || text}
    </Text>
  );
}

export default memo(MyText);
