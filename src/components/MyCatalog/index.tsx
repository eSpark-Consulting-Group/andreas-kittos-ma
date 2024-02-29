import React, {memo} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MyText from '../MyText';
import GapView from '../GapView';
import BubbleIcon from '../BubbleIcon';
import {MyCatalogProps, MyTheme, catalogItemProps} from '../../types';
import {CartIcon, Heart, HeartFill} from '../../assets';
import {RootStackParamsList} from '../../types/navigationParams';

type ProductViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

function MyCatalog({
  catalogName,
  catalogItems,
  onSeeAllPress,
  onFavPress,
}: MyCatalogProps) {
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;

  const onFav = (id: string) => {
    onFavPress!(id);
  };

  const renderCatalogItem = ({
    item,
    index,
  }: {
    item: {id: string; product: catalogItemProps};
    index: number;
  }) => {
    return catalogItem({
      item: item?.product ?? item?.productId,
      index,
      navigation,
      onFav,
      theme,
    });
  };

  console.log('catalog', catalogItems);

  return (
    <View style={{flex: 1}}>
      <View style={styles.catalogHeader}>
        <MyText size={18} text={catalogName} />
        <TouchableOpacity onPress={onSeeAllPress}>
          <MyText size={14} textColor={'#49ACE1'} text={'See All'} />
        </TouchableOpacity>
      </View>
      <GapView />
      <FlatList
        data={catalogItems}
        horizontal
        contentContainerStyle={{flex: 1}}
        ItemSeparatorComponent={() => <GapView length={15} mode="horizontal" />}
        renderItem={renderCatalogItem}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<GapView length={20} mode="horizontal" />}
        ListFooterComponent={<GapView length={20} mode="horizontal" />}
        ListEmptyComponent={
          <View style={{flex: 1, height: 150, justifyContent: 'center'}}>
            <MyText text="Coming Soon..." style={{textAlign: 'center'}} />
          </View>
        }
      />
    </View>
  );
}

const catalogItem = ({
  item,
  index,
  navigation,
  onFav,
  theme,
}: {
  item: catalogItemProps;
  index: number;
  navigation: ProductViewNavigationProps['navigation'];
  onFav: (id: string) => void;
  theme: MyTheme;
}) => {
  console.log('item.productImage', item);
  const productInfo = item;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('D1Nav', {
          screen: 'ProductView',
          params: {produtInfo: productInfo},
        })
      }
      key={index}
      style={styles.catalogItemContainer}>
      <GapView />
      <BubbleIcon
        size={30}
        style={styles.whislistIcon}
        children={
          !productInfo?.fav ? (
            <Heart color={theme.colors.placeholder} />
          ) : (
            <HeartFill />
          )
        }
        onPress={() => onFav(productInfo.id as string)}
      />
      <Image
        source={{uri: productInfo?.productImage as string}}
        style={styles.image}
      />
      <GapView length={15} />
      <View style={styles.detailsContainer}>
        <MyText
          numberOfLines={2}
          size={12}
          text={productInfo?.name}
          style={{height: 35}}
        />
        <GapView length={5} />
        <View style={styles.priceContainer}>
          <MyText
            size={12}
            weight="600"
            text={'€' + productInfo?.price + '.00'}
          />
          <CartIcon color={theme.colors.placeholder} />
        </View>
        <GapView length={5} />
        <MyText
          size={10}
          weight="500"
          textColor={theme.colors.primary}
          text="In stock"
        />
        <GapView length={5} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyCatalog);

const styles = StyleSheet.create({
  catalogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
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
