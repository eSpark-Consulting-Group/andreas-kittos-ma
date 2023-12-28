import React, {useState} from 'react';
import {MyInputProps} from '../../types';
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {EyeClosed} from '../../assets';
import {useTheme} from '@react-navigation/native';
import {MyText} from '..';

export default function MyInput({
  label,
  multiline,
  placeholder,
  password = false,
  onChange,
  text,
  style,
  inputStyle,
  placeholderColor,
  width,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  return (
    <View style={[styles({width}).container, style]}>
      {label && (
        <MyText style={{paddingLeft: 4, marginBottom: -6}} textColor="#888888">
          {label}
        </MyText>
      )}

      <View style={styles({}).inputContainer}>
        <TextInput
          multiline={multiline}
          secureTextEntry={password ? (showPassword ? false : true) : false}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor ? placeholderColor : '#888888'}
          value={text!}
          onChangeText={(val): void => onChange?.(val)}
          style={[inputStyle, styles({width, password}).InputStyle]}
        />
        {password && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{marginLeft: -20}}>
            {showPassword ? <EyeClosed /> : <EyeClosed />}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = ({
  width,
  password,
}: {
  width?: DimensionValue | undefined;
  password?: boolean;
}) =>
  StyleSheet.create({
    container: {
      borderBottomColor: '#E4E4E4',
      borderBottomWidth: 1,
      width: width ? width : '100%',
      paddingHorizontal: 10,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 45,
    },
    InputStyle: {fontFamily: 'Inter-Regular', width: password ? '90%' : '100%'},
  });
