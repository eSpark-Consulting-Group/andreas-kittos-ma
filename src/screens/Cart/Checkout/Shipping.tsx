import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CheckoutFooter, RadioMethodSeletor} from '.';
import {GapView, MyText} from '../../../components';
import {CalenderSvg} from '../../../assets';
import {MyTheme} from '../../../types';

export default function Shipping({
  setIndex,
}: {
  setIndex: (num: number) => void;
}) {
  const {colors} = useTheme() as MyTheme;
  const [activeIndex, setActiveIndex] = useState(0);

  const shipMethods = [
    {title: 'Pickup & Delivery', subTitle: '$7.50'},
    {title: 'Express - 12 Working Hours', subTitle: '$12.50'},
  ];
  return (
    <>
      <MyText weight="600" text="Shipping Method" />
      <GapView />
      <View
        style={{
          flex: 1,
        }}>
        {shipMethods.map((item, index) => (
          <RadioMethodSeletor
            key={index}
            item={item}
            index={index}
            onPress={() => setActiveIndex(index)}
            activeIndex={activeIndex}
          />
        ))}
        <MyText
          textColor="#666"
          style={{marginVertical: 15}}
          text="Delivery Date"
        />

        <View style={{...styles.delieveryDate, borderColor: colors.border}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalenderSvg />
            <GapView length={15} mode="horizontal" />
            <MyText weight="500" text="06 - Dec - 2023" />
          </View>
          <MyText textColor="#666" text="Change" />
        </View>
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
