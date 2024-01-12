import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MyCatalog, MyInput, MyText} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {Minus, SearchCart, TickCoupon, WashingMachine} from '../../assets';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

const laundryCatalog = [
  {
    name: 'Laundry Wash and Fold',
    image: WashingMachine,
    price: '€9.00',
    fav: true,
  },
  {
    name: 'Bath Mat - Wash & Iron',
    image: WashingMachine,
    price: '€6.00',
    fav: true,
  },
  {
    name: 'Big Size Towel - Cleaning',
    image: WashingMachine,
    price: '€4.00',
    fav: true,
  },
  {
    name: 'Feather Duvet King',
    image: WashingMachine,
    price: '€26.00',
    fav: true,
  },
  {
    name: 'Medium Size Towel - Cleaning',
    image: WashingMachine,
    price: '€3.00',
    fav: true,
  },
  {
    name: 'Table Cloth - Cleaning',
    image: WashingMachine,
    price: '€8.00',
    fav: true,
  },
];
const wishlist = true;

export default function Cart() {
  const theme = useTheme();
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  return (
    <ScrollView>
      <CartHeader theme={theme} />
      <FlatList
        data={['a', 'b', 'c', 'd']}
        scrollEnabled={false}
        renderItem={({item, index}) => <CartItems theme={theme} />}
      />
      <CouponContainer theme={theme} />
      <CostBox theme={theme} />
      {wishlist && (
        <View style={{marginTop: 30, marginBottom: 10}}>
          <MyCatalog
            catalogName="My wishlist"
            catalogItems={laundryCatalog}
            onSeeAllPress={() =>
              navigation.navigate('D1Nav', {screen: 'WishList'})
            }
          />
        </View>
      )}
    </ScrollView>
  );
}

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

const CouponContainer = ({theme}: {theme: Theme}) => {
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 50,
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{flex: 0.9}}
        onPress={() => {
          navigation.navigate('D1Nav', {screen: 'CouponList'});
        }}>
        <MyInput
          leftchild={<SearchCart color={theme.colors.primary} />}
          placeholder="Coupon code"
        />
      </Pressable>
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
    <View style={{paddingHorizontal: 20, marginBottom: 10}}>
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

const styles = ({theme}: {theme: Theme}) => StyleSheet.create({});
