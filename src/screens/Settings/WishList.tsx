import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
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
import FastImage from 'react-native-fast-image';
import {handleAddItemToCart} from '../Category/utils';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

type SettingNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function WishList() {
  const theme = useTheme();
  const cartItems: {
    id: string;
    quantity: number;
    product: catalogItemProps;
  }[] = useSelector((store: any) => store.cart.cartItems);

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

  const addToCart = async (id: string) => {
    setLoading(true);
    const exist = cartItems?.some(item => item.product.id == id);
    if (exist) {
      Toast.show({
        text1: 'This product already exist in your cart',
        type: 'error',
        topOffset: 0,
      });
      setLoading(false);
    } else {
      await handleAddItemToCart(id as string, 1);
      setLoading(false);
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
            onAddtoCart={() => addToCart(item.productId.id as string)}
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
  onAddtoCart,
}: {
  name: string;
  price: string;
  image: string;
  theme: MyTheme;
  onRemove: () => void;
  onAddtoCart: () => void;
}) => {
  const navigation = useNavigation<SettingNavigationProps['navigation']>();
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onRemove}>
        <MinusHeavy />
      </TouchableOpacity>
      <GapView length={20} mode="horizontal" />
      <FastImage source={{uri: image}} style={{width: 100, height: 100}} />
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
          onPress={onAddtoCart}
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
