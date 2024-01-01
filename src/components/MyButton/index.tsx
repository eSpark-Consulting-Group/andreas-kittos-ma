import {useTheme} from '@react-navigation/native';
import {MyButtonProps} from '../../types';
import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ButtonProps,
  View,
} from 'react-native';
import {MyText} from '..';
import {ButtonChevron} from '../../assets';

export default function MyButton({
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
    ...labelStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <MyText style={buttonTextStyle}>{label}</MyText>
      {chevron && (
        <View style={{paddingLeft: '2%'}}>
          <ButtonChevron />
        </View>
      )}
    </TouchableOpacity>
  );
}
