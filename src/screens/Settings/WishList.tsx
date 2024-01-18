import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {MyButton, MyText, MyView} from '../../components';
import {MinusHeavy, WashingMachine2} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type SettingNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

const wishListData = [
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

export default function WishList() {
  const theme = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <MyView topPad={0} hPad={0}>
        <View style={[styles.top, {borderColor: theme.colors.border}]}>
          <MyText text="4 items" textColor="#888888" size={14} />
        </View>
        {wishListData.map((item, index) => (
          <Item
            key={index}
            theme={theme}
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
  image: ImageURISource;
  theme: MyTheme;
}) => {
  const navigation = useNavigation<SettingNavigationProps['navigation']>();
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <MinusHeavy />
      <Image source={image} style={{width: 66, height: 94}} />
      <View>
        <MyText text={name} />
        <MyText
          text={'€' + price.toFixed(2).toString()}
          weight="700"
          size={16}
          style={{marginVertical: 10}}
        />
        <MyButton
          label="Add to cart"
          backgroundColor={theme.colors.primary}
          style={{width: 120}}
          onPress={() => navigation.navigate('Cart')}
        />
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
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
});
