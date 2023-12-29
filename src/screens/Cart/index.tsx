import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Theme, useTheme} from '@react-navigation/native';

import {MyHeader, MyText} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {Minus, SearchCart, TickCoupon, WashingMachine} from '../../assets';

export default function Cart() {
  const theme = useTheme();

  return (
    <View>
      <MyHeader
        label="My Cart"
        lefticon="back"
        right={<Button theme={theme} />}
      />
      <CartHeader theme={theme} />
      <CartItems theme={theme} />
      <CouponContainer theme={theme} />
      <CostBox theme={theme} />
    </View>
  );
}

const CouponContainer = ({theme}: {theme: Theme}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 50,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        }}>
        <SearchCart />
        <MyText text="Coupon code" style={{marginLeft: 17, width: 200}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.card,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <TickCoupon />
        <MyText
          text="Apply"
          textColor={theme.colors.primary}
          style={{marginLeft: 8}}
        />
      </View>
    </View>
  );
};

const CostBox = ({theme}: {theme: Theme}) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <View
        style={{
          backgroundColor: theme.colors.card,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyText text="Products" weight="400" size={12} />
          <MyText text="x8" weight="400" size={12} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <MyText text="Total:" weight="500" size={16} />
          <MyText text="$72.00" weight="500" size={16} />
        </View>
      </View>
    </View>
  );
};

const CartItems = ({theme}: {theme: Theme}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <View>
        <Minus />
      </View>
      <Image source={WashingMachine} style={{width: 70, height: 70}} />
      <View>
        <MyText text={'Laundry - Dry - Ironing (per kilo)'} />
        <MyText text={'$9.00'} style={{marginVertical: 10}} />
        <Counter theme={theme} />
      </View>
    </View>
  );
};

const Counter = ({theme}: {theme: Theme}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          width: 30,
          height: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="minus" color={theme.colors.text} />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          height: 30,
          width: 100,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
        }}>
        <MyText text="1" textColor={theme.colors.text} />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          width: 30,
          height: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="plus" color={theme.colors.text} />
      </View>
    </View>
  );
};

const CartHeader = ({theme}: {theme: Theme}) => {
  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingVertical: 17,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MyText
          text="TOTAL"
          size={14}
          weight="600"
          textColor={theme.colors.text}
        />
        <MyText
          text="8 items"
          size={12}
          weight="400"
          textColor={theme.colors.text}
          style={{marginLeft: 10}}
        />
      </View>
      <MyText text="CLEAR CART" size={12} weight="400" textColor="#E54252" />
    </View>
  );
};

const Button = ({theme}: {theme: Theme}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 11,
      }}>
      <MyText style={{color: theme.colors.background}} size={14} weight="500">
        Checkout
      </MyText>
      <Feather
        name="chevron-right"
        size={14}
        color={theme.colors.background}
        style={{textAlignVertical: 'center', marginLeft: 10}}
      />
    </View>
  );
};
