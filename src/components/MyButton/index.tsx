import {memo} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {MyButtonProps} from '../../types';
import MyText from '../MyText';

function MyButton({
  label,
  onPress,
  textColor,
  backgroundColor,
  style,
  labelStyle,
  chevron,
}: MyButtonProps) {
  const theme = useTheme();
  const buttonStyle: ViewStyle = {
    backgroundColor: backgroundColor || theme.colors.primary,
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    ...style,
  };

  const buttonTextStyle: TextStyle = {
    color: textColor || 'white',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Inter',
    textAlign: 'center',
    width: '100%',
    ...labelStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <MyText style={buttonTextStyle}>{label}</MyText>
      {chevron && (
        <Feather
          name="chevron-right"
          size={14}
          color={'#ffffff'}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

export default memo(MyButton);

const styles = StyleSheet.create({
  icon: {
    textAlignVertical: 'center',
    marginLeft: 10,
  },
});
