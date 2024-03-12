import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyText, MyView} from '../../components';
import {AddToCart, Filter, WashingMachine2} from '../../assets';
import {MyTheme} from '../../types';
import FastImage, {Source} from 'react-native-fast-image';

const searchListData = [
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    price: 9.0,
    image: WashingMachine2,
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    price: 9.0,
    image: WashingMachine2,
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    price: 9.0,
    image: WashingMachine2,
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    price: 9.0,
    image: WashingMachine2,
  },
];

export default function SearchList() {
  const theme = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <MyView topPad={0} hPad={0}>
        <View style={[styles.top, {borderColor: theme.colors.border}]}>
          <MyText text="Results" textColor="#888888" size={14} />
          <View style={[styles.head, {borderColor: theme.colors.border}]}>
            <Filter />
          </View>
        </View>
        {searchListData.map((item, index) => (
          <Item
            key={index}
            theme={theme as MyTheme}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </MyView>
    </ScrollView>
  );
}

const Item = ({
  theme,
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: Source;
  theme: MyTheme;
}) => {
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <FastImage source={image} style={{width: 40, height: 56}} />
      <View style={{width: '65%'}}>
        <MyText text={name} />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MyText
            text={'€' + price.toFixed(2).toString()}
            weight="700"
            size={16}
            style={{marginVertical: 10}}
          />
          <AddToCart />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    width: '100%',
    paddingLeft: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
  },
  head: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    marginRight: 20,
  },
});
