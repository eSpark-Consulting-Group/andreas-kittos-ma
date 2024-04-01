import React, {memo} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {MyTheme, catalogItemProps} from '../../types';
import MyText from '../MyText';
import GapView from '../GapView';
import BubbleIcon from '../BubbleIcon';
import {CartIcon, Heart, HeartFill} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RootStackParamsList} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

type ProductViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

const MyCatalogItem = ({
  item,
  index,
  onFav,
  fav,
  categoryId,
  categoryName,
  onPress,
}: {
  item: catalogItemProps;
  categoryId?: string;
  categoryName?: string;
  index?: number;
  onFav?: (id: string, add: boolean) => void;
  fav: boolean;
  onPress?: () => void;
}) => {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (onPress) {
          onPress!();
        }
        navigation.navigate('D1Nav', {
          screen: 'ProductView',
          params: {categoryName, categoryId, produtInfo: item},
        });
      }}
      key={index}
      style={styles.catalogItemContainer}>
      <GapView />
      <BubbleIcon
        size={30}
        style={styles.whislistIcon}
        onPress={() => (onFav ? onFav(item.id as string, fav) : null)}
        children={
          !fav ? <Heart color={theme.colors.placeholder} /> : <HeartFill />
        }
      />
      <FastImage
        source={
          typeof item?.productImage == 'string'
            ? {uri: item?.productImage as string}
            : item?.productImage
        }
        style={styles.image}
      />
      <GapView length={15} />
      <View style={styles.detailsContainer}>
        <MyText
          numberOfLines={2}
          size={12}
          text={item.name}
          style={{height: 35}}
        />
        <GapView length={5} />
        <View style={styles.priceContainer}>
          <MyText
            size={12}
            weight="600"
            text={'€' + Number(item?.price).toFixed(2)}
          />
          <CartIcon color={theme.colors.placeholder} />
        </View>
        <GapView length={5} />
        <MyText size={10} weight="500" textColor="#49ACE1" text="In stock" />
        <GapView length={5} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyCatalogItem);

const styles = StyleSheet.create({
  catalogItemContainer: {
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E4E4E4',
  },
  whislistIcon: {position: 'absolute', zIndex: 1, right: 5, top: 5},
  detailsContainer: {width: '100%', paddingHorizontal: 10},
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {width: 100, height: 100},
});
