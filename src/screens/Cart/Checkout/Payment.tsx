import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {GapView, MyText} from '../../../components';
import {CheckoutFooter, RadioMethodSeletor} from '.';
import {MyTheme} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Payment({setIndex}: {setIndex: (num: number) => void}) {
  const theme = useTheme() as MyTheme;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<CartNavigationProps['navigation']>();

  const payMethods = [
    {
      title: 'Cash or Card on delivery',
      subTitle: 'Pay with cash or card upon delivery.',
    },
    {title: 'Online payment ', subTitle: 'Pay with card before delivery.'},
  ];

  return (
    <>
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
          />
        ))}
        <GapView />
        <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
          <View style={styles.row}>
            <MyText size={12} textColor="#666" text="Subtotal" />
            <MyText size={12} textColor="#666" text="$72.00" />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText
              size={12}
              weight="500"
              textColor="#666"
              text="Pickup & Delivery"
            />
            <MyText size={12} textColor="#666" text="$7.50" />
          </View>
          <GapView />
          <View style={styles.row}>
            <MyText size={12} textColor="#666" text="Total" />
            <MyText
              size={16}
              weight="500"
              style={{textDecorationLine: 'underline'}}
              textColor="#666"
              text="$79.50"
            />
          </View>
        </View>
      </View>
      <CheckoutFooter
        priButtonLabel="Place my order"
        secButtonLabel="Go back"
        priButtonPress={() =>
          navigation.navigate('D1Nav', {screen: 'OrderSubmit'})
        }
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
