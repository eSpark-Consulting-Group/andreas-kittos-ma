import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {Google, MLSlogo, Pencil, Phone} from '../../assets';
import {MyTheme} from '../../types';

export default function SignIn() {
  const navigation = useNavigation();
  const theme = useTheme() as MyTheme;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      showToast('Please fill all fields', 'error');
    } else if (username !== password) {
      showToast('Warning: Inavlid username or password', 'error');
    } else {
      () => navigation.navigate('Draw');
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
    <>
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput
            placeholder="Username"
            value={username}
            onChange={text => {
              setUsername(text);
              console.log(username);
            }}
          />
          <MyInput
            placeholder="Password"
            password
            value={password}
            onChange={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.rstPwd}
          onPress={() => navigation.navigate('ResetPassword')}>
          <MyText
            textColor={theme.colors.primary}
            style={styles.decoration}
            text="Reset Password"
            weight="500"
          />
        </TouchableOpacity>
        <MyButton
          label="Sign In"
          style={styles.rstPwd}
          onPress={handleSignIn}
        />
        <View style={styles.orContainer}>
          <View
            style={[styles.line, {borderBottomColor: theme.colors.border}]}
          />
          <MyText
            style={styles.or}
            text="OR"
            textColor={theme.colors.placeholder}
          />
          <View
            style={[styles.line, {borderBottomColor: theme.colors.border}]}
          />
        </View>
        <View style={styles.bubbles}>
          <BubbleIcon size={40} plain>
            <Google />
          </BubbleIcon>
          <BubbleIcon size={40} plain>
            <Phone />
          </BubbleIcon>
        </View>
        <View style={styles.rowText}>
          <MyText text="Don’t have an account?" />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <MyText
              text="Sign up"
              textColor={theme.colors.primary}
              weight="500"
              style={{textDecorationLine: 'underline'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
  },
  line: {
    borderBottomWidth: 1,
    width: '25%',
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {width: 20, height: 17},
  bubbles: {flexDirection: 'row', gap: 20, marginVertical: 30},
  rowText: {flexDirection: 'row', gap: 5},
});
