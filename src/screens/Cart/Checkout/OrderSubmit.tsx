import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyButton, MyText} from '../../../components';
import {MyTheme} from '../../../types';
import MyDropDown from '../../../components/MyDropDown';
import {WashingMachine} from '../../../assets';
import {
  BottomTabParamsList,
  D1ParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';
import FastImage from 'react-native-fast-image';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

type OrderNavigationProps = NativeStackScreenProps<D1ParamsList, 'OrderSubmit'>;

export default function OrderSubmit() {
  const {colors} = useTheme() as MyTheme;
  const [open, setOpen] = useState(true);
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const route = useNavigation<OrderNavigationProps['route']>();

  const OrderDetails = route.params?.orderData;

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.card,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}>
        <MyText size={12} weight="500" text="It’s ordered!" />
        <MyText
          size={12}
          weight="500"
          text={'Order No. ' + OrderDetails.orderNumber}
        />
      </View>
      <GapView />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20}}>
        <MyDropDown
          title="Order details"
          open={open}
          onPress={() => setOpen(!open)}>
          <View>
            {OrderDetails.orderDetail.map(item => (
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
                    <MyText text={item.quantity} />
                  </View>
                </View>
              </View>
            ))}

            <GapView length={20} />
            <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
              <View style={styles.row}>
                <MyText textColor={colors.textSec} text="Subtotal" />
                <MyText
                  textColor={colors.textSec}
                  text={'€' + OrderDetails.subTotal}
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
                  text={'€' + OrderDetails.deliveryCharges}
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
                  text={'€' + OrderDetails.total}
                />
              </View>
            </View>
          </View>
        </MyDropDown>
        <GapView length={20} />
        <MyText
          size={16}
          weight="600"
          text="You’ve successfully placed the order"
        />
        <MyText
          size={14}
          weight="400"
          text="You can check status of your order by using our delivery status feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress."
        />
        <GapView length={20} />
        <MyButton
          onPress={() => navigation.navigate('D1Nav', {screen: 'OrderHistory'})}
          label="Show all my orders"
          labelStyle={{color: colors.positive}}
        />
        <GapView length={20} />
        <MyText size={16} weight="600" text="Your account" />
        <MyText
          size={14}
          weight="400"
          text="You can log to your account using e-mail and password defined earlier. On your account you can edit your profile data, check history of transactions, edit subscription to newsletter."
        />
        <GapView length={20} />
        <MyButton
          onPress={() => navigation.navigate('Home')}
          label="Back to shop"
          textColor={colors.primary}
          backgroundColor={colors.background}
          style={{borderWidth: 1, borderColor: colors.primary}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
