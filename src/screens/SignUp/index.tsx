import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyText,
  OverlayLoader,
} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {EMAIL_REGEX} from '../../constants/validations/schema';
import {handleSignUpUser} from './utils';

type SignUpNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'SignUp'
>;
export default function SignUp() {
  const navigation = useNavigation<SignUpNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;

  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fName || !lName || !pw || !confirmPw || !email) {
      showToast('Please fill all fields', 'error');
    } else if (!email.match(EMAIL_REGEX)) {
      showToast('Warning: Invalid email address', 'error');
    } else if (pw !== confirmPw) {
      showToast('Warning: Passwords do not match', 'error');
    } else {
      setLoading(true);
      const res: {status: boolean; hash?: string} = await handleSignUpUser({
        first_name: fName,
        last_name: lName,
        email,
        password: pw,
      });
      setLoading(false);
      console.log('res', res);
      if (res.status == true) {
        console.log('got the hash', res?.hash);
        navigation.navigate('VerificationScreen', {
          otphash: res.hash!,
          type: 'email',
          email,
        });
      } else {
        console.log('Error');
      }
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
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.navigate('SignIn')}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput placeholder="First Name" onChange={text => setFname(text)} />
          <MyInput placeholder="Last Name" onChange={text => setLname(text)} />
          <MyInput
            placeholder="Enter your email"
            onChange={text => setEmail(text)}
          />
          <MyInput
            placeholder="Enter your Password"
            password
            onChange={text => setPw(text)}
          />
          <MyInput
            placeholder="Confirm password"
            password
            onChange={text => setConfirmPw(text)}
          />
        </View>
        <View style={[styles.rstPwd, styles.prvPolicy]}>
          <MyText text="By signing up, you agree to our " size={12} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('D1Nav', {screen: 'PrivacyPolicy'})
            }>
            <MyText
              textColor={theme.colors.primary}
              style={styles.decoration}
              text="Privacy policy"
              size={12}
              weight="500"
            />
          </TouchableOpacity>
        </View>
        <MyButton
          label="Sign Up"
          style={styles.rstPwd}
          onPress={handleSignUp}
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

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.rowText}>
          <MyText
            text="Sign in to your account"
            textColor={theme.colors.primary}
            weight="500"
            style={{textDecorationLine: 'underline'}}
          />
        </TouchableOpacity>
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
    // width: '40%',
    flex: 1,
  },
  inputs: {gap: 12, marginTop: 72},
  rstPwd: {marginVertical: 20},
  prvPolicy: {
    alignSelf: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {paddingHorizontal: 20, height: 17},
  rowText: {flexDirection: 'row', gap: 5, marginTop: 30},
});
