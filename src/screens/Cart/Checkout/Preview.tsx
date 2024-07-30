import React, {useState} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useTheme} from '@react-navigation/native';

import {GapView, MyInput, MyText} from '../../../components';
import {CheckoutFooter} from '.';
import MyDropDown from '../../../components/MyDropDown';
import {SearchCart, TickCoupon} from '../../../assets';
import {MyTheme, UserInfoAddr, catalogItemProps} from '../../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {setCheckoutNote} from '../../../features/checkout/checkoutSlice';
import Toast from 'react-native-toast-message';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Preview({setIndex}: {setIndex: (num: number) => void}) {
  const {colors} = useTheme() as MyTheme;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const shipAddr: UserInfoAddr = useSelector(
    (store: any) => store.checkout.shipAddress,
  );
  const checkoutNote: string = useSelector(
    (store: any) => store.checkout.checkoutNote,
  );
  const cartItems: {
    id: string;
    quantity: number;
    product: catalogItemProps;
  }[] = useSelector((store: any) => store.cart.cartItems);
  const cartTotal: number = useSelector((store: any) => store.cart.cartTotal);

  console.log('sippAddr', shipAddr);

  const shipDetails = [
    {title: 'First Name', desc: shipAddr.firstName},
    {title: 'Last Name', desc: shipAddr.lastName},
    {title: 'Phone Number', desc: shipAddr.phoneNumber},
    {title: 'Email', desc: shipAddr.email},
    {title: 'Country', desc: shipAddr.country},
    {title: 'State/Province', desc: shipAddr.state},
    {title: 'City', desc: shipAddr.city},
    {title: 'Street', desc: shipAddr.street},
    {title: 'Zip-code', desc: shipAddr.zipCode},
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <MyDropDown
          title="Shipping Address"
          open={open}
          onPress={() => setOpen(!open)}>
          <View
            style={{
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            {shipDetails.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <MyText
                  size={12}
                  textColor={colors.textSec}
                  style={{width: '40%'}}
                  text={item.title + ':'}
                />
                <MyText size={12} style={{width: '60%'}} text={item.desc} />
              </View>
            ))}
          </View>
        </MyDropDown>
        <GapView length={20} />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
          <MyText weight="600" text="Order Details" />
          <GapView length={20} />
          {cartItems?.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 15,
                }}>
                <FastImage
                  source={{uri: item.product.productImage as string}}
                  style={{width: 70, height: 70}}
                />
                <GapView mode="horizontal" length={15} />
                <View style={{flex: 1}}>
                  <MyText text={item.product.name} />
                  <MyText
                    text={'€' + Number(item.product.price).toFixed(2)}
                    style={{marginVertical: 10}}
                  />
                  <View
                    style={{
                      width: '25%',
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 5,
                      alignItems: 'center',
                      backgroundColor: colors.card,
                    }}>
                    <MyText text={item.quantity.toString()} />
                  </View>
                </View>
              </View>
              <GapView length={15} />
            </View>
          ))}

          {/* <CouponContainer colors={colors} /> */}
          <GapView length={20} />
        </View>
        <GapView length={20} />
        <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
          <View style={styles.row}>
            <MyText textColor={colors.textSec} text="Subtotal" />
            <MyText
              textColor={colors.textSec}
              text={'€' + cartTotal.toFixed(2)}
            />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText
              weight="500"
              textColor={colors.textSec}
              text="Pickup & Delivery"
            />
            <MyText
              textColor={colors.textSec}
              text={
                shipAddr.distanceOut! > 0
                  ? `€${(shipAddr.distanceOut! * 5).toFixed(2)}`
                  : 'Free Shipping'
              }
            />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText textColor={colors.textSec} text="Total" />
            <MyText
              size={16}
              weight="500"
              style={{textDecorationLine: 'underline'}}
              textColor={colors.textSec}
              text={
                '€' +
                (shipAddr.distanceOut! > 0
                  ? (cartTotal + shipAddr.distanceOut! * 5).toFixed(2)
                  : cartTotal.toFixed(2))
              }
            />
          </View>
        </View>
        <GapView length={20} />
        <MyText weight="600" text="Your Note" />
        <GapView />
        <TextInput
          multiline
          value={checkoutNote}
          numberOfLines={4}
          placeholder="Write your note"
          placeholderTextColor={colors.placeholder}
          onChangeText={e => dispatch(setCheckoutNote(e))}
          style={{
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
            textAlignVertical: 'top',
            fontSize: 12,
            padding: 10,
            height: Platform.OS == 'ios' ? 100 : undefined,
          }}
        />
      </ScrollView>
      <CheckoutFooter
        priButtonLabel="Continue to Payment"
        secButtonLabel="Go back"
        priButtonPress={() => {
          if (checkoutNote) {
            setIndex(3);
          } else {
            Toast.show({
              text1: 'Please type note for rider',
              type: 'error',
              topOffset: 0,
            });
          }
        }}
        secButtonPress={() => setIndex(1)}
      />
    </>
  );
}

const CouponContainer = ({colors}: {colors: MyTheme['colors']}) => {
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 30,
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{flex: 0.9}}
        // onPress={() => {
        //   navigation.navigate('D1Nav', {screen: 'CouponList'});
        // }}
      >
        <MyInput
          leftchild={<SearchCart color={colors.primary} />}
          placeholder="Coupon code"
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.card,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <TickCoupon />
        <MyText
          text="Apply"
          textColor={colors.primary}
          style={{marginLeft: 8}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
