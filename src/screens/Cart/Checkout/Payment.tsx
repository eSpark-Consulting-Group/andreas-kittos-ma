import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {GapView, MyText, OverlayLoader} from '../../../components';
import {CheckoutFooter, RadioMethodSeletor} from '.';
import {MyTheme, UserInfoAddr} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';
import {useDispatch, useSelector} from 'react-redux';
import {handleCheckout} from './utils';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../../../features/cart/cartSlice';
import {
  setCheckoutNote,
  setShipAddress,
  setShipAddressId,
} from '../../../features/checkout/checkoutSlice';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Payment({setIndex}: {setIndex: (num: number) => void}) {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const dispatch = useDispatch();
  const shipAddr: UserInfoAddr = useSelector(
    (store: any) => store.checkout.shipAddress,
  );
  const shipAddrId: string = useSelector(
    (store: any) => store.checkout.addressId,
  );
  const checkoutNote: string = useSelector(
    (store: any) => store.checkout.checkoutNote,
  );
  const cartTotal: number = useSelector((store: any) => store.cart.cartTotal);
  const cartId: string = useSelector((store: any) => store.cart.cartId);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const payMethods = [
    {
      title: 'Cash on delivery',
      subTitle: 'Pay with cash upon delivery.',
    },
    // {title: 'Online payment ', subTitle: 'Pay with card before delivery.'},
  ];

  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return `${year}-${month < 10 ? 0 + month : month}-${
      date < 10 ? 0 + date : date
    }`;
  };

  const clearAll = () => {
    dispatch(setCartItems([]));
    dispatch(setCartId(null));
    dispatch(setCartTotal(null));
    dispatch(setCheckoutNote(''));
    dispatch(setShipAddressId(null));
    dispatch(setShipAddress(null));
  };

  const checkOut = async () => {
    setLoading(true);
    const checkoutData = {
      total: (cartTotal + shipAddr.distanceOut! * 5).toFixed(2),
      subTotal: cartTotal,
      shippingType: 'standard',
      deliveryCharges: (shipAddr.distanceOut! * 5).toFixed(2),
      note: checkoutNote,
      deliveryDate: getCurrentDate() + ' 14:24:36',
      cartId,
      shippingAddressId: shipAddrId,
    };
    console.log('checkout data', checkoutData);
    // navigation.navigate('D1Nav', {screen: 'OrderSubmit'});
    const res = await handleCheckout(checkoutData);
    console.log('res data', res.data);

    if (res.data) {
      navigation.navigate('D1Nav', {
        screen: 'OrderSubmit',
        params: {orderData: res.data},
      });
      clearAll();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <OverlayLoader isShow={loading} />
      <MyText weight="600" text="Payment Methods" />
      <GapView />
      <MyText size={12} text="Choose your payment method" />
      <GapView />
      <View
        style={{
          flex: 1,
        }}>
        {payMethods.map((item, index) => (
          <RadioMethodSeletor
            key={index}
            item={item}
            index={index}
            onPress={() => setActiveIndex(index)}
            activeIndex={activeIndex}
            theme={theme}
          />
        ))}
        <GapView />
        <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
          <View style={styles.row}>
            <MyText
              size={12}
              textColor={theme.colors.textSec}
              text="Subtotal"
            />
            <MyText
              size={12}
              textColor={theme.colors.textSec}
              text={'€' + cartTotal.toFixed(2)}
            />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText
              size={12}
              weight="500"
              textColor={theme.colors.textSec}
              text="Pickup & Delivery"
            />
            <MyText
              size={12}
              textColor={theme.colors.textSec}
              text={'€' + (shipAddr.distanceOut! * 5).toFixed(2)}
            />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText size={12} textColor={theme.colors.textSec} text="Total" />
            <MyText
              size={16}
              weight="500"
              style={{textDecorationLine: 'underline'}}
              textColor={theme.colors.textSec}
              text={'€' + (cartTotal + shipAddr.distanceOut! * 5).toFixed(2)}
            />
          </View>
        </View>
      </View>
      <CheckoutFooter
        priButtonLabel="Place my order"
        secButtonLabel="Go back"
        priButtonPress={checkOut}
        secButtonPress={() => setIndex(2)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
