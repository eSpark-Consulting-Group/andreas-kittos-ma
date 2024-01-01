import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {Back, Key} from '../../assets';
import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {MyTheme} from '../../types';

export default function ResetPassword() {
  const navigation = useNavigation();
  const theme = useTheme() as MyTheme;
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      showToast('Warning: Invalid email address', 'error');
    } else {
      showToast('Link has been sent to your email', 'success');
    }
  };

  const showToast = (message: string, type?: 'success' | 'error') => {
    Toast.show({
      type: type,
      position: 'top',
      text1: message,
      topOffset: 0,
    });
  };

  return (
    <View
      style={[
        styles.main,
        {gap: 20, backgroundColor: theme.colors.background},
      ]}>
      <Pressable
        style={{top: 10, left: 20, position: 'absolute'}}
        onPress={() => navigation.navigate('SignIn')}>
        <BubbleIcon>
          <Back />
        </BubbleIcon>
      </Pressable>
      <MyText
        text="Reset Your Password"
        size={25}
        textColor={theme.colors.primary}
        weight="500"
        style={{marginTop: 219, marginBottom: 20}}
      />
      <Key />
      <MyInput
        placeholder="Your username or email"
        onChange={text => setEmail(text)}
      />
      <MyButton label="Get password link" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
  },
});
