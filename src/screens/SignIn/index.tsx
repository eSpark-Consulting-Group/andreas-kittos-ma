import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyText,
  OverlayLoader,
} from '../../components';
import {Google, MLSlogo, Phone} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {handleSignInUser} from './utils';
import {EMAIL_REGEX} from '../../constants/validations/schema';

type SignInNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'SignIn'
>;

export default function SignIn() {
  const navigation = useNavigation<SignInNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.match(EMAIL_REGEX) || !password) {
      showToast('Please fill all fields', 'error');
    } else {
      await callApiSignIn();
    }
  };

  const callApiSignIn = async () => {
    setLoading(true);
    const res: {status: boolean; token?: string} = await handleSignInUser({
      email,
      password,
    });
    setLoading(false);
    console.log('res', res);
    if (res.status == true) {
      setEmail('');
      setPassword('');
      console.log('got the token', res?.token);
      navigation.navigate('Draw');
    } else {
      console.log('Error');
      showToast('Email or Password is incorrect', 'error');
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <OverlayLoader isShow={loading} />
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput
            text={email}
            placeholder="Email Address"
            onChange={text => {
              setEmail(text);
              console.log(email);
            }}
          />
          <MyInput
            text={password}
            placeholder="Password"
            password
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
          <BubbleIcon
            size={40}
            plain
            onPress={() => navigation.navigate('WithPhone')}>
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
    </ScrollView>
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
    // width: '25%',
    flex: 1,
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {paddingHorizontal: 20, height: 17},
  bubbles: {flexDirection: 'row', gap: 20, marginVertical: 30},
  rowText: {flexDirection: 'row', gap: 5},
});
