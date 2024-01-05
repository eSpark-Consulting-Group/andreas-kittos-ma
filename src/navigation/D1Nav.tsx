import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BubbleIcon, MyHeader} from '../components';
import {DotsHorizontal} from '../assets';
import {D1ParamsList} from '../types/navigationParams';
import Profile from '../screens/Settings/Profile';
import AllowCamera from '../screens/Search/AllowCamera';
import WishList from '../screens/Settings/WishList';
import CategoryView from '../screens/Category/CategoryView';
import ProductView from '../screens/Category/ProductView';
import {useNavigation} from '@react-navigation/native';
import CouponList from '../screens/Cart/CouponList';

export default function D1Nav() {
  const RootStack = createNativeStackNavigator<D1ParamsList>();

  return (
    <RootStack.Navigator>
      <RootStack.Group key={'Category/Product View'}>
        <RootStack.Screen
          name="CategoryView"
          component={CategoryView}
          options={{
            header: props => (
              <MyHeader
                center="searchBar"
                lefticon="back"
                right={
                  <BubbleIcon>
                    <DotsHorizontal />
                  </BubbleIcon>
                }
                searchBarStyle={{marginHorizontal: 15}}
                onPressLeft={() => props.navigation.goBack()}
              />
            ),
          }}
        />
        <RootStack.Screen
          name="ProductView"
          component={ProductView}
          options={{
            headerShown: false,
          }}
        />
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
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
