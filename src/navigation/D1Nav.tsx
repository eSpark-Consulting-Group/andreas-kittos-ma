import React, {useEffect, useState} from 'react';
import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Theme, useTheme} from '@react-navigation/native';

import {BSheetModal, BubbleIcon, MyHeader, MyText} from '../components';
import {CartThin, DotsHorizontal, HeartThin, Scan, ShareThin} from '../assets';
import {D1ParamsList} from '../types/navigationParams';

import Profile from '../screens/Settings/Profile';
import AllowCamera from '../screens/Search/AllowCamera';
import WishList from '../screens/Settings/WishList';
import CategoryView from '../screens/Category/CategoryView';
import ProductView from '../screens/Category/ProductView';
import CouponList from '../screens/Cart/CouponList';
import MyNotifications from '../screens/Settings/MyNotifications';
import Languages from '../screens/Settings/Languages';
import Checkout from '../screens/Cart/Checkout';
import OrderHistory from '../screens/Settings/OrderHistory';
import PrivacyPolicy from '../screens/Settings/PrivacyPolicy';
import AboutUs from '../screens/Settings/AboutUs';
import DeleteAccount from '../screens/Settings/DeleteAccount';
import SelectAddress from '../screens/Cart/Checkout/SelectAddress';
import SearchAddress from '../screens/Cart/Checkout/SearchAddress';
import OrderSubmit from '../screens/Cart/Checkout/OrderSubmit';
import ProductImage from '../screens/Category/ProductImage';
import EnterPassword from '../screens/Settings/EnterPassword';
import OrderItem from '../screens/Settings/OrderItem';
import VerificationScreen from '../screens/VerificationScreen';
import store from '../app/store';
import {
  setSearchCatItems,
  setSearchCatText,
} from '../features/search/searchSlice';
import {handlefilterProducts} from '../utils';
import {handleGetPlaces} from '../screens/Cart/Checkout/utils';
import {setSearchPlaces} from '../features/checkout/checkoutSlice';
import {MyTheme} from '../types';

export default function D1Nav() {
  const RootStack = createNativeStackNavigator<D1ParamsList>();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'MPOUGADA LAUNDRY SERVICE',
        message:
          "Hey There I'am using MPOUGADA LAUNDRY SERVICE for my laundry, Its Great",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        setVisible(false);
        return true;
      } else {
        backHandler.remove();
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [visible]);

  return (
    <RootStack.Navigator>
      <RootStack.Group key={'Category/Product View'}>
        <RootStack.Screen
          name="CategoryView"
          component={CategoryView}
          options={{
            header: (
              {navigation, route}: any, // fix later
            ) => (
              <>
                <MyHeader
                  center="searchBar"
                  lefticon="back"
                  right={
                    <BubbleIcon onPress={() => setVisible(true)}>
                      <DotsHorizontal
                        color={
                          theme.dark ? theme.colors.text : theme.colors.primary
                        }
                      />
                    </BubbleIcon>
                  }
                  searchBarStyle={{marginHorizontal: 15}}
                  onPressLeft={() => {
                    navigation.goBack();
                    store.dispatch(setSearchCatText(''));
                    store.dispatch(setSearchCatItems([]));
                  }}
                  onClear={() => {
                    store.dispatch(setSearchCatText(''));
                    store.dispatch(setSearchCatItems([]));
                  }}
                  onSubmit={async e => {
                    store.dispatch(setSearchCatText(e.nativeEvent.text));
                    const filterData = await handlefilterProducts({
                      categoryId: route?.params?.categoryId,
                      searchedText: e.nativeEvent.text,
                    });
                    if (filterData.status) {
                      store.dispatch(setSearchCatItems(filterData.data));
                    }
                  }}
                />
                <BSheetModal
                  theme={theme as MyTheme}
                  visible={visible}
                  onClose={val => setVisible(val)}>
                  <View style={{marginTop: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false);
                        navigation.navigate('Cart');
                      }}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 15,
                        paddingLeft: 40,
                        alignItems: 'center',
                      }}>
                      <CartThin color={theme.colors.text} />
                      <MyText
                        text="My Cart"
                        size={16}
                        textColor={theme.colors.text}
                        style={{marginLeft: 10, opacity: 0.6}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false);
                        navigation.navigate('D1Nav', {
                          screen: 'WishList',
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 15,
                        paddingLeft: 40,
                        paddingTop: 25,
                        alignItems: 'center',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: theme.colors.border,
                      }}>
                      <HeartThin color={theme.colors.text} />
                      <MyText
                        text="My WishList"
                        size={16}
                        textColor={theme.colors.text}
                        style={{marginLeft: 10, opacity: 0.6}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onShare}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 15,
                        paddingLeft: 40,
                        paddingTop: 25,
                        alignItems: 'center',
                      }}>
                      <ShareThin color={theme.colors.text} />
                      <MyText
                        text="Share"
                        size={16}
                        textColor={theme.colors.text}
                        style={{marginLeft: 10, opacity: 0.6}}
                      />
                    </TouchableOpacity>
                  </View>
                </BSheetModal>
              </>
            ),
          }}
        />
        <RootStack.Group key={'Product'}>
          <RootStack.Screen
            name="ProductView"
            component={ProductView}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="ProductImage"
            component={ProductImage}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Group>
      </RootStack.Group>
      <RootStack.Group key={'Search'}>
        <RootStack.Screen
          name="AllowCamera"
          component={AllowCamera}
          options={{headerShown: false}}
        />
      </RootStack.Group>
      <RootStack.Group key={'Cart'}>
        <RootStack.Screen
          name="CouponList"
          component={CouponList}
          options={{
            header: props => (
              <MyHeader
                center="searchBar"
                lefticon="back"
                searchBarStyle={{marginHorizontal: 15}}
                onPressLeft={() => props.navigation.goBack()}
                searchBarLabel="Coupon code"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            header: props => (
              <MyHeader
                label="Checkout"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="OrderSubmit"
          component={OrderSubmit}
          options={{
            header: props => (
              <MyHeader
                label="Checkout"
                onPressLeft={() => props.navigation.navigate('Home')}
                lefticon="close"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="SelectAddress"
          component={SelectAddress}
          options={{
            header: props => (
              <MyHeader
                label="Select Address"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="SearchAddress"
          component={SearchAddress}
          options={{
            header: props => (
              <MyHeader
                searchBarLabel="Search place here"
                center="searchBar"
                searchBarStyle={{marginHorizontal: 20}}
                onPressLeft={() => {
                  store.dispatch(setSearchPlaces(null));
                  props.navigation.goBack();
                }}
                lefticon="back"
                onSubmit={async e => {
                  if (e.nativeEvent.text !== '') {
                    const searchPlaces = await handleGetPlaces(
                      e.nativeEvent.text,
                    );
                    store.dispatch(setSearchPlaces(searchPlaces.data));
                  }
                }}
                onClear={() => store.dispatch(setSearchPlaces(null))}
              />
            ),
          }}
        />
      </RootStack.Group>
      <RootStack.Group key={'Setting'}>
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={{
            header: props => (
              <MyHeader
                label="Edit Profile"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="WishList"
          component={WishList}
          options={{
            header: props => (
              <MyHeader
                label="My Wishlist"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="Notifications"
          component={MyNotifications}
          options={{
            header: props => (
              <MyHeader
                label="My Notifications"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="Languages"
          component={Languages}
          options={{
            header: props => (
              <MyHeader
                label="Languages"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            header: props => (
              <MyHeader
                label="Privacy Policy"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            header: props => (
              <MyHeader
                label="About Us"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{
            header: props => (
              <MyHeader
                label="Order History"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="OrderItem"
          component={OrderItem}
          options={{
            header: props => (
              <MyHeader
                label="Order History"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{
            header: props => (
              <MyHeader
                label="Delete Account"
                onPressLeft={() => props.navigation.goBack()}
                lefticon="back"
              />
            ),
          }}
        />
        <RootStack.Screen
          name="EnterPassword"
          component={EnterPassword}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
