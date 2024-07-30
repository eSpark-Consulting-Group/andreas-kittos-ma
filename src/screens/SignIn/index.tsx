import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyPopup,
  MyText,
  OverlayLoader,
} from '../../components';
import {
  CloseBtn,
  Email,
  Google,
  MLSlogo,
  Phone,
  SearchGrey,
} from '../../assets';
import {storage} from '../../app/mmkv';
import {MyTheme, catalogItemProps} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {UserObject, handleOAuthSiginIn, handleSignInUser} from './utils';
import {EMAIL_REGEX, PHONE_REGEX} from '../../constants/validations/schema';
import {setUserData, setUserToken} from '../../features/user/userSlice';
import {handleSignUpUser} from '../SignUp/utils';
import {setCategories} from '../../features/category/categorySlice';
import {handleGetCategories} from '../Category/utils';
import {setFavorites} from '../../features/product/productSlice';
import {
  getCartTotal,
  getUserProfile,
  getWishlistIds,
  handleGetCart,
  handleGetStatics,
} from '../../utils';
import {setAboutUs, setPolicy} from '../../features/statics/staticSlice';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../../features/cart/cartSlice';
import FastImage from 'react-native-fast-image';
import {countryCodes} from '../../constants';

type SignInNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'SignIn'
>;

export default function SignIn() {
  const navigation = useNavigation<SignInNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [usingPhone, setUsingPhone] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const [selected, setSelected] = useState<{
    name: string;
    code: string;
    flagCode: string;
  }>({name: 'Cyprus', code: '+357', flagCode: 'CY'});

  const dispatch = useDispatch();

  const clearFields = () => {
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  };

  const handleSignIn = async () => {
    if ((usingPhone && !phoneNumber) || (!usingPhone && !email) || !password) {
      showToast('Please fill all fields', 'error');
    } else if (
      usingPhone &&
      (phoneNumber.length < 8 ||
        phoneNumber.length > 10 ||
        (phoneNumber.length >= 8 &&
          phoneNumber.length <= 10 &&
          Number(phoneNumber).toString() == NaN.toString()))
    ) {
      showToast('Invalid phone number', 'error');
    } else if (!usingPhone && !email.match(EMAIL_REGEX)) {
      showToast('Invalid email address', 'error');
    } else {
      await callApiSignIn();
    }
  };

  const handleChange = (text: string) => {
    setSearchText(text.toLowerCase()); // Ensure case-insensitive search
    const filtered = countryCodes.filter(country =>
      country.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCountries(filtered);
  };

  const callApiSignIn = async () => {
    setLoading(true);
    const res: {status: boolean; message?: string; userInfo?: UserObject} =
      await handleSignInUser({
        userCred: usingPhone ? selected.code + phoneNumber : email,
        password,
      });
    setLoading(false);
    if (res.status == true) {
      clearFields();
      storage.set('userToken', res.userInfo?.token as string);
      dispatch(setUserToken(res.userInfo?.token));
      getUserData();
      getStatics();
      getCategoriesData();
      getWishlist();
      getCart();
    } else {
      showToast(res?.message as string, 'error');
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

  const showToast = (message: string, type?: 'success' | 'error') => {
    Toast.show({
      type: type,
      position: 'top',
      text1: message,
      topOffset: 0,
    });
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(async userData => {
        const res: {status: boolean; userInfo?: UserObject; message?: string} =
          await handleOAuthSiginIn({
            firstName: userData.user.givenName ?? '',
            lastName:
              userData.user.familyName ?? (userData.user.givenName as string),
            email: userData.user.email,
            socialId: userData.user.id ?? '',
            profileImage: userData.user.photo ?? '',
          });
        if (res.status) {
          storage.set('userToken', res.userInfo?.token as string);
          storage.set('userData', JSON.stringify(res.userInfo?.user));
          setLoading(false);
          dispatch(setUserToken(res.userInfo?.token));
          dispatch(setUserData(res.userInfo?.user));
          getCategoriesData();
          getWishlist();
          getUserData();
          getStatics();
          getCart();
        } else {
          setLoading(false);
        }
      });
      await GoogleSignin.signOut();
    } catch (error) {
      showToast(JSON.parse(JSON.stringify(error)).message, 'error');
      setLoading(false);
    }
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <OverlayLoader isShow={loading} />
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <MLSlogo />
        <View style={styles.inputs}>
          {usingPhone ? (
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
                  style={[styles.flag, {marginRight: 10}]}
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
              placeholder="Email Address"
              onChange={text => {
                setEmail(text);
              }}
            />
          )}
          <MyInput
            text={password}
            placeholder="Password"
            password
            onChange={text => setPassword(text)}
          />
        </View>
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
        <TouchableOpacity
          style={styles.rstPwd}
          onPress={() =>
            navigation.navigate('ResetPassword', {usingPhone: usingPhone})
          }>
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
          <BubbleIcon onPress={signInWithGoogle} size={40} plain>
            <Google />
          </BubbleIcon>
          <BubbleIcon
            size={40}
            plain
            onPress={() => {
              setUsingPhone(!usingPhone);
              clearFields();
            }}>
            {usingPhone ? <Email width={24} /> : <Phone />}
          </BubbleIcon>
        </View>
        <View style={styles.rowText}>
          <MyText text="Don’t have an account?" />
          <TouchableOpacity
            onPress={() =>
              usingPhone
                ? navigation.navigate('WithPhone')
                : navigation.navigate('SignUp')
            }>
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
