import React, {useState, useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Back, Key} from '../../assets';
import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyText,
  OverlayLoader,
} from '../../components';
import {MyTheme} from '../../types';
import {
  RootStackParamsList,
  BottomTabParamsList,
} from '../../types/navigationParams';
import {EMAIL_REGEX} from '../../constants/validations/schema';
import {handleResetPass, handleSendLink} from './utils';
import {useDeepLink} from '../../hooks';

type ResetPasswordNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'ResetPassword'
>;

export default function ResetPassword() {
  const navigation =
    useNavigation<ResetPasswordNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const {token: ongoingToken} = useDeepLink();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const {params} = useRoute<ResetPasswordNavigationProps['route']>();
  const handleGetToken = () => {
    if (ongoingToken) return ongoingToken;
    if (params?.token) return params?.token;
  };

  useEffect(() => {
    setUserToken(() => handleGetToken()!);
    return () => {
      setUserToken('');
    };
  }, [ongoingToken, params?.token]);

  const handlePasswordLink = async () => {
    if (!email.match(EMAIL_REGEX)) {
      showToast('Warning: Invalid email address', 'error');
    } else {
      showToast('Link has been sent to your email', 'success');
      await callApiGetLink();
    }
  };

  const handleResetPassword = () => {
    if (pass.length > 5 && cPass.length > 5) {
      if (pass === cPass) {
        callApiResetPass();
      } else {
        showToast('Password do not match', 'error');
      }
    } else {
      showToast('Password must be at least 6 characters', 'error');
    }
  };

  const callApiGetLink = async () => {
    setLoading(true);
    const res: {status: boolean} = await handleSendLink({
      to: email,
    });
    setLoading(false);
    setEmail('');
    console.log('res', res);
    if (res.status == true) {
      console.log('got the token');
    } else {
      console.log('Error');
    }
  };

  const callApiResetPass = async () => {
    setLoading(true);
    const res: {status: boolean} = await handleResetPass({
      password: pass,
      token: userToken,
    });
    setLoading(false);
    setPass('');
    setCPass('');
    console.log('res', res);
    if (res.status == true) {
      console.log('got the token, SignIn');
      navigation.navigate('Draw'); //TODO: save the token in the global store(will be used to call apis)
    } else {
      console.log('Error');
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
      <View
        style={[
          styles.main,
          {gap: 20, backgroundColor: theme.colors.background},
        ]}>
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.navigate('SignIn')}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MyText
          text="Reset Your Password"
          size={25}
          textColor={theme.colors.primary}
          weight="500"
          style={{marginTop: userToken ? 150 : 219, marginBottom: 20}}
        />
        <Key />
        {userToken?.length > 0 ? (
          <>
            <MyInput
              text={pass}
              placeholder="Enter your Password"
              password
              onChange={text => setPass(text)}
            />
            <MyInput
              text={cPass}
              placeholder="Confirm password"
              password
              onChange={text => setCPass(text)}
            />
          </>
        ) : (
          <MyInput
            text={email}
            placeholder="Your username or email"
            onChange={text => setEmail(text)}
          />
        )}
        <MyButton
          style={{marginTop: 20}}
          label={userToken ? 'Confirm' : 'Get password link'}
          onPress={() =>
            userToken ? handleResetPassword() : handlePasswordLink()
          }
        />
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
});
