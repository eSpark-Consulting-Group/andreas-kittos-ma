import React, {memo, useState} from 'react';
import {
  DimensionValue,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MyText from '../MyText';
import {MyInputProps, MyTheme} from '../../types';
import {EyeClosed} from '../../assets';

function MyInput({
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
  leftchild,
  keyboardType,
  editable,
  onBlur,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // This will be called when the screen comes into focus
      return () => {
        setShowPassword(false);
      };
    }, []),
  );

  const theme = useTheme() as MyTheme;
  return (
    <View
      style={[
        styles({width}).container,
        style,
        {borderColor: theme.colors.border},
      ]}>
      {label && (
        <MyText style={styles({}).label} textColor={theme.colors.placeholder}>
          {label}
        </MyText>
      )}
      <View style={[styles({}).inputContainer]}>
        {leftchild && <View style={{paddingRight: 10}}>{leftchild}</View>}
        <TextInput
          editable={editable}
          multiline={multiline}
          onBlur={onBlur}
          secureTextEntry={password ? (showPassword ? false : true) : false}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderColor ? placeholderColor : theme.colors.placeholder
          }
          value={text!}
          onChangeText={(val): void => onChange?.(val)}
          style={[
            styles({width, password}).InputStyle,
            inputStyle,
            {
              paddingVertical: Platform.OS == 'ios' ? 15 : undefined,
              color: theme.colors.text,
            },
          ]}
          keyboardType={keyboardType}
        />
        {password && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{marginLeft: -20}}>
            {showPassword ? (
              <SimpleLineIcons
                name="eye"
                size={20}
                color={theme.colors.placeholder}
              />
            ) : (
              <EyeClosed />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default memo(MyInput);

const styles = ({
  width,
  password,
}: {
  width?: DimensionValue | undefined;
  password?: boolean;
}) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      width: width ? width : '100%',
      paddingHorizontal: 10,
    },
    label: {paddingLeft: 4, marginBottom: -6},
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    InputStyle: {
      fontFamily: 'Inter-Regular',
      width: password ? '90%' : '100%',
      fontSize: 16,
    },
  });
