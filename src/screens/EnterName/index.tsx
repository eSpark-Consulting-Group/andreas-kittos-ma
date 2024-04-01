import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  BubbleIcon,
  GapView,
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
import {storage} from '../../app/mmkv';
import {
  getCartTotal,
  getUserProfile,
  getWishlistIds,
  handleGetCart,
  handleGetStatics,
  handleSignUpPhone,
  handleUpdateProfile,
} from '../../utils';
import {setUserData, setUserToken} from '../../features/user/userSlice';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {setCategories} from '../../features/category/categorySlice';
import {handleGetCategories} from '../Category/utils';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../../features/cart/cartSlice';
import {setAboutUs, setPolicy} from '../../features/statics/staticSlice';
import {setFavorites} from '../../features/product/productSlice';

type EnterNameNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'EnterName'
>;

interface Creds {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export default function EnterName() {
  const navigation = useNavigation<EnterNameNavigationProps['navigation']>();
  const route = useRoute<EnterNameNavigationProps['route']>();
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const {phoneNumber, password} = route.params;

  const saveUserName = async () => {
    if (firstName?.length < 1 || lastName?.length < 1) {
      Toast.show({text1: 'Please fill all fields', type: 'error'});
    } else {
      setLoading(true);
      const res = await handleSignUpPhone({
        firstName,
        lastName,
        phoneNumber,
        password,
      });
      if (res.status) {
        const notified = storage.getBoolean('notified');
        storage.set('userToken', res.userInfo?.token as string);
        dispatch(setUserToken(res.userInfo?.token));
        getUserData();
        getCart();
        getCategoriesData();
        getStatics();
        getWishlist();
        if (notified) {
          navigation.navigate('Draw');
        } else {
          navigation.navigate('GetNotified');
        }
      }
      setLoading(false);
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

  return (
    <ScrollView>
      <OverlayLoader isShow={loading} />
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.navigate('WithPhone')}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput placeholder="First Name" onChange={e => setFirstName(e)} />
          <MyInput placeholder="Last Name" onChange={e => setLastName(e)} />
        </View>
        <GapView length={65} />
        <MyButton label="Submit" style={styles.rstPwd} onPress={saveUserName} />
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

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <MyText
            text="Sign in to your account"
            textColor={theme.colors.primary}
            weight="500"
            style={{textDecorationLine: 'underline', marginTop: 30}}
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
    flex: 1,
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {paddingHorizontal: 20, height: 17},
});
