import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Back, CloseBtn, Key, SearchGrey} from '../../assets';
import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyPopup,
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
import FastImage from 'react-native-fast-image';
import {countryCodes} from '../../constants';

type ResetPasswordNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'ResetPassword'
>;

export default function ResetPassword() {
  const navigation =
    useNavigation<ResetPasswordNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [searchText, setSearchText] = useState('');
  const {token: ongoingToken} = useDeepLink();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [usingPhone, setUsingPhone] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const [selected, setSelected] = useState<{
    name: string;
    code: string;
    flagCode: string;
  }>({name: 'Cyprus', code: '+357', flagCode: 'CY'});
  const {params} = useRoute<ResetPasswordNavigationProps['route']>();
  // const handleGetToken = () => {
  //   if (ongoingToken) return ongoingToken;
  //   if (params?.token) return params?.token;
  // };

  // useEffect(() => {
  //   setUserToken(() => handleGetToken()!);
  //   return () => {
  //     setUserToken('');
  //   };
  // }, [ongoingToken, params?.token]);

  const handlePasswordLink = async () => {
    if (
      (params?.usingPhone &&
        (phoneNumber.length < 8 ||
          phoneNumber.length > 10 ||
          (phoneNumber.length >= 8 &&
            phoneNumber.length <= 10 &&
            Number(phoneNumber).toString() == NaN.toString()))) ||
      (!usingPhone && !email.match(EMAIL_REGEX))
    ) {
      params?.usingPhone
        ? showToast('Warning: Invalid phone number', 'error')
        : showToast('Warning: Invalid email address', 'error');
    } else {
      await callApiGetLink();
    }
  };

  const handleChange = (text: string) => {
    setSearchText(text.toLowerCase()); // Ensure case-insensitive search
    const filtered = countryCodes.filter(country =>
      country.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCountries(filtered);
  };

  const renderCountryItem = ({
    item,
    theme,
  }: {
    item: {name: string; code: string; flagCode: string};
    theme?: MyTheme;
  }) => (
    <Pressable
      style={styles.bar}
      onPress={() => {
        setSelected(item);
        setisVisible(false);
      }}>
      <View style={styles.row}>
        <FastImage
          source={{uri: `https://flagsapi.com/${item.flagCode}/flat/64.png`}}
          style={styles.flag}
        />
        <MyText size={14}>{item.name}</MyText>
      </View>
    </Pressable>
  );

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
    const res: {status: boolean; otphash?: string} = await handleSendLink({
      emailPhone: params?.usingPhone ? selected.code + phoneNumber : email,
    });
    setLoading(false);
    setEmail('');
    console.log('res', res?.otphash);
    if (res.status == true) {
      console.log('got the token');
      showToast('OTP has been sent to your email', 'success');
      navigation.navigate('VerificationScreen', {
        type: 'resetPass',
        otphash: res?.otphash as string,
        emailPhone: params?.usingPhone ? selected.code + phoneNumber : email,
      });
    } else {
      console.log('Error');
    }
  };

  const callApiResetPass = async () => {
    setLoading(true);
    const res: {status: boolean; message: string} = await handleResetPass({
      password: pass,
      otp: params?.otp as string,
      hash: params?.hash as string,
      emailPhone: params?.emailPhone as string,
    });
    setLoading(false);
    setPass('');
    setCPass('');
    console.log('res', res);
    if (res.status == true) {
      console.log('got the token, SignIn');
      showToast(res.message, 'success');
      navigation.navigate('SignIn'); //TODO: save the token in the global store(will be used to call apis)
    } else {
      showToast(res.message, 'error');
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

  console.log('params', params);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <OverlayLoader isShow={loading} />
      <MyPopup height={'83%'} width={'80%'} visible={isVisible}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => setisVisible(false)}>
          <CloseBtn />
        </TouchableOpacity>
        <MyInput
          placeholder="Search here"
          text={searchText}
          onChange={handleChange}
          inputStyle={{fontSize: 14}}
          style={{marginVertical: 20}}
          leftchild={<SearchGrey />}
        />
        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.code}
          renderItem={({item}) => renderCountryItem({item})}
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
        />
      </MyPopup>
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
        {params?.otp ? (
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
          <View>
            {params?.usingPhone ? (
              <View style={styles.middle}>
                <Pressable
                  style={[
                    styles.left,
                    {
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setisVisible(true)}>
                  <FastImage
                    source={{
                      uri: `https://flagsapi.com/${selected.flagCode}/flat/64.png`,
                    }}
                    style={styles.flag}
                  />
                  <MyText size={16}>{selected.code}</MyText>
                </Pressable>
                <MyInput
                  placeholder="Phone Number"
                  text={phoneNumber}
                  onChange={text => setPhoneNumber(text)}
                  keyboardType="decimal-pad"
                  style={{flex: 1}}
                />
              </View>
            ) : (
              <MyInput
                text={email}
                placeholder="Your username or email"
                onChange={text => setEmail(text)}
              />
            )}
          </View>

          //////
        )}
        <MyButton
          style={{marginTop: 20}}
          label={params?.otp ? 'Confirm' : 'Get OTP'}
          onPress={() =>
            params?.otp ? handleResetPassword() : handlePasswordLink()
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
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {paddingHorizontal: 20, height: 17},
  bubbles: {flexDirection: 'row', gap: 20, marginVertical: 30},
  rowText: {flexDirection: 'row', gap: 5},
  flag: {width: 40, height: 28.57, borderRadius: 10, marginRight: 20},
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  middle: {
    flexDirection: 'row',
    width: '100%',
  },
  left: {
    width: 100,
    height: 50,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
