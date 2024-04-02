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
import {useDispatch, useSelector} from 'react-redux';

import {BubbleIcon, MyButton, MyText, OverlayLoader} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {
  handleProfileVerify,
  handleResendEmailOTP,
  handleResendPhoneOTP,
  handleVerifyOTP,
} from './utils';
import {
  getCartTotal,
  getUserProfile,
  getWishlistIds,
  handleGetCart,
  handleGetStatics,
  hideEmail,
  hidePhoneNumber,
} from '../../utils';
import {setUserData, setUserToken} from '../../features/user/userSlice';
import {storage} from '../../app/mmkv';
import {handleSendLink} from '../ResetPassword/utils';
import {UserObject, handleSignInUser} from '../SignIn/utils';
import {handleGetCategories} from '../Category/utils';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../../features/cart/cartSlice';
import {setCategories} from '../../features/category/categorySlice';
import {setAboutUs, setPolicy} from '../../features/statics/staticSlice';
import {setFavorites} from '../../features/product/productSlice';

type VerificationNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'VerificationScreen'
>;
export default function VerificationScreen() {
  const navigation = useNavigation<VerificationNavigationProps['navigation']>();
  const route = useRoute<VerificationNavigationProps['route']>();
  const dispatch = useDispatch();
  const token: string = useSelector((store: any) => store.user.token);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme() as MyTheme;
  const {type, otphash, emailPhone, pass} = route.params;

  console.log('tpye otphash emailPhone pass', type, otphash, emailPhone, pass);

  const handleVerification = async () => {
    if (otpCode.length == 4) {
      setLoading(true);
      if (type == 'resetPassPhone' || type == 'resetPassEmail') {
        navigation.navigate('ResetPassword', {
          emailPhone: emailPhone as string,
          hash: otphash,
          otp: otpCode,
        });
      } else if (type == 'email') {
        const res: {status: boolean; message?: string} = await handleVerifyOTP({
          emailPhone: emailPhone as string,
          hash: otphash,
          otp: otpCode,
        });
        setLoading(false);
        if (res?.status == true) {
          const resSignIn: {
            status: boolean;
            message?: string;
            userInfo?: UserObject;
          } = await handleSignInUser({
            userCred: emailPhone!,
            password: pass!,
          });
          Toast.show({
            text1: 'Account Created Successfully',
            type: 'success',
            topOffset: 0,
          });
          storage.set('userToken', resSignIn.userInfo?.token as string);
          dispatch(setUserToken(resSignIn.userInfo?.token));
          getUserData();
          getStatics();
          getCategoriesData();
          getWishlist();
          getCart();
        } else {
          if (res?.status == false) {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: res?.message ?? 'Something went wrong',
              topOffset: 0,
            });
          }
        }
      } else {
        const res: {status: boolean; message?: string} = await handleVerifyOTP({
          emailPhone: emailPhone as string,
          hash: otphash,
          otp: otpCode,
        });
        if (res?.status == true) {
          navigation.navigate('EnterPassword', {
            phoneNumber: emailPhone as string,
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    }
  };

  const getUserData = async () => {
    const res = await getUserProfile();
    if (res.status) {
      storage.set('userData', JSON.stringify(res.data));
      dispatch(setUserData(res.data));
    }
  };

  const getCart = async () => {
    const cartRes = await handleGetCart();
    if (cartRes.status) {
      dispatch(setCartId(cartRes.data?.id));
      dispatch(setCartItems(cartRes.data?.items));
      dispatch(setCartTotal(getCartTotal(cartRes.data?.items as [])));
    }
  };

  const getCategoriesData = async () => {
    const res: {status: boolean; data?: []} = await handleGetCategories();
    if (res?.data) {
      dispatch(setCategories(res?.data));
    }
  };

  const getStatics = async () => {
    const res: {
      status: boolean;
      data?: {id: string; key: string; value: string}[];
    } = await handleGetStatics();
    if (res?.data) {
      res?.data.map(item => {
        if (item.key == 'about-us') {
          dispatch(setAboutUs(item.value));
        } else if (item.key == 'about-us') {
          dispatch(setPolicy(item.value));
        }
      });
    }
  };

  const getWishlist = async () => {
    dispatch(setFavorites(await getWishlistIds()));
  };

  const handleProfileVerification = async () => {
    if (otpCode.length == 4) {
      setLoading(true);
      if (type == 'email') {
        const res: {status: boolean; message?: string} =
          await handleProfileVerify(
            {
              emailPhone: emailPhone as string,
              hash: otphash,
              otp: otpCode,
            },
            token,
          );
        setLoading(false);
        if (res?.status == true) {
          navigation.navigate('Settings', {getProfile: true});
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Profile Updated Successfully',
            topOffset: 0,
          });
        } else {
          if (res?.status == false) {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: res?.message ?? 'Something went wrong',
              topOffset: 0,
            });
          }
        }
      } else {
        const res: {status: boolean; message?: string} =
          await handleProfileVerify(
            {
              emailPhone: emailPhone as string,
              hash: otphash,
              otp: otpCode,
            },
            token,
          );
        setLoading(false);
        if (res?.status == true) {
          navigation.navigate('Settings', {getProfile: true});
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Profile Updated Successfully',
            topOffset: 0,
          });
        } else {
          if (res?.status == false) {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: res?.message ?? 'Something went wrong',
              topOffset: 0,
            });
          }
        }
      }
    }
  };

  const renderText = (type: string) => {
    if (type == 'email' || type == 'resetPassEmail') {
      return `Please Enter the code we have send to the email ${hideEmail(
        emailPhone!,
      )}`;
    } else if (type == 'phone' || type == 'resetPassPhone') {
      return `Please Enter the code we have send to the phone ${hidePhoneNumber(
        emailPhone!,
      )}`;
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
            text={renderText(type)}
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
              setOtpCode(code);
            }}
            containerStyle={{width: '75%'}}
          />
        </View>
        <View style={styles.bottom}>
          <MyButton
            label="Submit"
            onPress={() =>
              route.params.fromProfile
                ? handleProfileVerification()
                : handleVerification()
            }
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={async () => {
              setLoading(true);
              if (type == 'resetPassPhone' || type == 'resetPassEmail') {
                const res: {
                  status: boolean;
                  otphash?: string;
                } = await handleSendLink({
                  emailPhone: emailPhone as string,
                });
                setLoading(false);
                if (res.status) {
                  navigation.setParams({otphash: res?.otphash});
                }
              } else if (type == 'email') {
                const res: {status: boolean; otphash?: string} =
                  await handleResendEmailOTP({email: emailPhone as string});
                setLoading(false);
                navigation.setParams({otphash: res?.otphash});
              } else {
                const res = await handleResendPhoneOTP({
                  phoneNumber: emailPhone as string,
                });
                console.log('res hash', res?.hash);

                setLoading(false);
                navigation.setParams({otphash: res?.hash});
              }
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
