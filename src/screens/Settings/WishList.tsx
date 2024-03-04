import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {
  GapView,
  MyButton,
  MyText,
  MyView,
  OverlayLoader,
} from '../../components';
import {MinusHeavy, WashingMachine2} from '../../assets';
import {MyTheme, catalogItemProps} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {handleGetFavourites, toggleFavourite} from '../../utils';

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

  const [wishList, setWishList] = useState<
    {
      id: string;
      productId: catalogItemProps;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavouriteData();
  }, []);

  const getFavouriteData = async () => {
    setLoading(true);
    const res: {status: boolean; data?: []} = await handleGetFavourites();
    if (res.status) {
      setLoading(false);
      setWishList(res?.data as []);
    } else {
      setLoading(false);
    }
  };

  const onMinusPress = async (id: string) => {
    const res: {status: boolean; data?: []} = await toggleFavourite(id);
    console.log('res', res.data);
    if (res.status) {
      getFavouriteData();
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <MyView topPad={0} hPad={0}>
        <View style={[styles.top, {borderColor: theme.colors.border}]}>
          <MyText
            text={
              wishList?.length == 1
                ? wishList?.length + ' item'
                : wishList?.length + ' items'
            }
            textColor="#888888"
            size={14}
          />
        </View>
        {wishList.map((item, index) => (
          <Item
            key={index}
            theme={theme as MyTheme}
            name={item.productId.name}
            price={'€' + item.productId.price + '.00'}
            image={item.productId.productImage as string}
            onRemove={() => onMinusPress(item.productId.id as string)}
          />
        ))}
        {!loading && wishList.length == 0 ? (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyText text="No Favourites found" />
          </View>
        ) : null}
      </MyView>
    </ScrollView>
  );
}

const Item = ({
  theme,
  name,
  price,
  image,
  onRemove,
}: {
  name: string;
  price: string;
  image: string;
  theme: MyTheme;
  onRemove: () => void;
}) => {
  const navigation = useNavigation<SettingNavigationProps['navigation']>();
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onRemove}>
        <MinusHeavy />
      </TouchableOpacity>
      <GapView length={20} mode="horizontal" />
      <Image source={{uri: image}} style={{width: 100, height: 100}} />
      <GapView length={20} mode="horizontal" />
      <View>
        <MyText text={name} />
        <MyText
          text={price}
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
    borderBottomWidth: 1,
  },
});
