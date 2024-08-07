import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CheckoutFooter, RadioMethodSeletor} from '.';
import {GapView, MyText} from '../../../components';
import {MyTheme, UserInfoAddr} from '../../../types';
import {useSelector} from 'react-redux';

export default function Shipping({
  setIndex,
}: {
  setIndex: (num: number) => void;
}) {
  const theme = useTheme() as MyTheme;
  const shipAddr: UserInfoAddr = useSelector(
    (store: any) => store.checkout.shipAddress,
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const shipMethods = [
    {title: 'Pickup & Delivery', subTitle: '€7.50'},
    // {title: 'Express - 12 Working Hours', subTitle: '$12.50'},
  ];

  return (
    <>
      <MyText weight="600" text="Shipping Method" />
      <GapView />
      <View
        style={{
          flex: 1,
        }}>
        {shipMethods?.map((item, index) => (
          <RadioMethodSeletor
            key={index}
            item={{
              title: item.title,
              subTitle:
                shipAddr.distanceOut! > 0
                  ? `€ ${(shipAddr.distanceOut! * 5).toFixed(2)}`
                  : 'Free Shipping',
            }}
            index={index}
            onPress={() => setActiveIndex(index)}
            activeIndex={activeIndex}
            theme={theme}
          />
        ))}
        {/* <MyText
          textColor={theme.colors.textSec}
          style={{marginVertical: 15}}
          text="Delivery Date"
        />

        <View
          style={{...styles.delieveryDate, borderColor: theme.colors.border}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalenderSvg />
            <GapView length={15} mode="horizontal" />
            <MyText weight="500" text="06 - Dec - 2023" />
          </View>
          <MyText textColor={theme.colors.textSec} text="Change" />
        </View> */}
      </View>
      <CheckoutFooter
        priButtonLabel="Continue to preview"
        secButtonLabel="Go back"
        priButtonPress={() => setIndex(2)}
        secButtonPress={() => setIndex(0)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  delieveryDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
