import React, {memo} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MyText from '../MyText';
import GapView from '../GapView';
import {MyCatalogProps, MyTheme, catalogItemProps} from '../../types';
import {RootStackParamsList} from '../../types/navigationParams';
import MyCatalogItem from '../MyCatalogItem';
import {WINDOW_WIDTH} from '../../constants';

type ProductViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

function MyCatalog({
  catalogName,
  catalogItems,
  onSeeAllPress,
  onFavPress,
  favorites,
  listEmptyText,
}: MyCatalogProps) {
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;

  const onFav = (id: string, add: boolean) => {
    onFavPress!(id, add);
  };

  const renderCatalogItem = ({
    item,
    index,
  }: {
    item: {id: string; product: catalogItemProps; productId?: catalogItemProps};
    index: number;
  }) => {
    return (
      <MyCatalogItem
        item={item?.product ?? item?.productId}
        index={index}
        onFav={onFav}
        fav={favorites?.some(fav =>
          item.product ? fav == item.product.id : fav == item.productId?.id,
        )}
      />
    );
  };

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
        ItemSeparatorComponent={() => <GapView length={15} mode="horizontal" />}
        renderItem={renderCatalogItem}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<GapView length={20} mode="horizontal" />}
        ListFooterComponent={<GapView length={20} mode="horizontal" />}
        ListEmptyComponent={
          <View
            style={{
              width: WINDOW_WIDTH - 30,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MyText text={listEmptyText ?? 'Coming Soon...'} />
          </View>
        }
      />
    </View>
  );
}

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
