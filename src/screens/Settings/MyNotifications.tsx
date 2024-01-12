import React from 'react';
import {
  Image,
  ImageURISource,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {WashingMachine2} from '../../assets';
import {GapView, MyText, MyView} from '../../components';
import {MyTheme} from '../../types';
import {useTheme} from '@react-navigation/native';

const notificationData = [
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: 'Now',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
  {
    name: '5 Kg - Laundry - Dry - Ironing !',
    orderNo: '123456',
    image: WashingMachine2,
    date: '6 Dec',
  },
];

export default function MyNotifications() {
  const theme = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}>
      <MyView style={{flex: 1}} topPad={17} botPad={17}>
        {notificationData.length > 1 ? (
          notificationData.map((item, index) => (
            <View key={index}>
              <Item
                theme={theme}
                name={item.name}
                orderNo={item.orderNo}
                image={item.image}
                date={item.date}
              />
              {index < notificationData.length - 1 && <GapView length={15} />}
            </View>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyText text="No Notifications!" textColor="#888888" />
          </View>
        )}
      </MyView>
    </ScrollView>
  );
}

const Item = ({
  theme,
  name,
  orderNo,
  image,
  date,
}: {
  name: string;
  orderNo: string;
  image: ImageURISource;
  theme: MyTheme;
  date: string;
}) => {
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Image source={image} style={{width: 17, height: 25}} />
      </View>
      <View>
        <MyText text={name} size={12} />
        <MyText
          text={'Order No: ' + orderNo}
          weight="400"
          size={10}
          style={{marginTop: 5, opacity: 0.5}}
        />
      </View>
      <View style={{height: '100%'}}>
        <MyText
          text={date}
          weight="300"
          size={10}
          style={{
            alignSelf: 'flex-start',
            opacity: 0.8,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF8FC',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});
