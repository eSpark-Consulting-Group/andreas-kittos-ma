import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {BubbleIcon, MyButton, MyText, OverlayLoader} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {handleVerifyEmail} from './utils';
import {hideEmail} from '../../utils';

type VerificationNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'VerificationScreen'
>;
export default function VerificationScreen() {
  const navigation = useNavigation<VerificationNavigationProps['navigation']>();
  const route = useRoute<VerificationNavigationProps['route']>();
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme() as MyTheme;
  const {type, otphash, email, phone} = route.params;

  const handleVerification = async () => {
    if (otpCode.length == 4) {
      setLoading(true);
      if (type == 'email') {
        const res: {status: boolean; token?: string; message?: string} =
          await handleVerifyEmail({
            email: email as string,
            hash: otphash,
            otp: otpCode,
          });
        setLoading(false);
        console.log('res', res);
        if (res.status == true) {
          console.log('Verified Email got token after verify', res?.token);
          navigation.navigate('Draw');
        } else {
          if (res.status == false) {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: res?.message ?? 'Something went wrong',
              topOffset: 0,
            });
          }
          console.log('Error');
        }
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Enter the Otp Code',
          topOffset: 0,
        });
      }
    }
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.goBack()}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
        <View style={styles.middle}>
          {/*dark theme color needed*/}
          <MyText
            text="Verification Code"
            size={20}
            textColor={theme.colors.textSec}
          />
          <MyText
            text={`Please Enter the code that we have send to the ${
              type == 'email' ? `email ${hideEmail(email!)}` : `phone ${phone}`
            }`}
            size={12}
            textColor={theme.colors.placeholder}
          />
          <OTPTextInput
            offTintColor={theme.colors.primary}
            tintColor={theme.colors.primary}
            textInputStyle={{
              ...styles.container,
              backgroundColor: theme.colors.background,
            }}
            autoFocus
            handleTextChange={code => {
              console.log('code', code);
              setOtpCode(code);
            }}
            containerStyle={{width: '75%'}}
          />
        </View>
        <View style={styles.bottom}>
          <MyButton label="Submit" onPress={() => handleVerification()} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              /*TODO: do the resend code api here */
            }}>
            <MyText
              text="Resend Code"
              size={10}
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
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    borderBottomWidth: 1,
    color: '#49ACE1',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    paddingBottom: 120,
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    color: '#49ACE1',
  },
  boxes: {flexDirection: 'row', gap: 15},
  bottom: {
    alignItems: 'center',
    alignContent: 'center',
    gap: 13,
    width: '100%',
  },
});
