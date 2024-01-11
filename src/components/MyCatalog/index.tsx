import React, {memo} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MyText from '../MyText';
import GapView from '../GapView';
import BubbleIcon from '../BubbleIcon';
import {MyCatalogProps, catalogItemProps} from '../../types';
import {CartIcon, Heart, HeartFill} from '../../assets';
import {RootStackParamsList} from '../../types/navigationParams';

type ProductViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;
function MyCatalog({catalogName, catalogItems, onSeeAllPress}: MyCatalogProps) {
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  return (
    <View>
      <View style={styles.catalogHeader}>
        <MyText size={18} textColor={'#424242'} text={catalogName} />
        <TouchableOpacity onPress={onSeeAllPress}>
          <MyText size={14} textColor={'#49ACE1'} text={'See All'} />
        </TouchableOpacity>
      </View>
      <GapView />
      <FlatList
        data={catalogItems}
        horizontal
        ItemSeparatorComponent={() => <GapView length={15} mode="horizontal" />}
        renderItem={({item, index}) => catalogItem({item, index, navigation})}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<GapView length={20} mode="horizontal" />}
        ListFooterComponent={<GapView length={20} mode="horizontal" />}
      />
    </View>
  );
}

const catalogItem = ({
  item,
  index,
  navigation,
}: {
  item: catalogItemProps;
  index: number;
  navigation: ProductViewNavigationProps['navigation'];
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('D1Nav', {screen: 'ProductView'})}
      key={index}
      style={styles.catalogItemContainer}>
      <GapView />
      <BubbleIcon
        size={30}
        style={styles.whislistIcon}
        children={!item.fav ? <Heart /> : <HeartFill />}
      />
      <Image source={item.image} style={{width: 100, height: 100}} />
      <GapView length={15} />
      <View style={styles.detailsContainer}>
        <MyText
          numberOfLines={2}
          size={12}
          textColor="#424242"
          text={item.name}
          style={{height: 35}}
        />
        <GapView length={5} />
        <View style={styles.priceContainer}>
          <MyText
            size={12}
            weight="600"
            textColor="#424242"
            text={item.price}
          />
          <CartIcon />
        </View>
        <GapView length={5} />
        <MyText size={10} weight="500" textColor="#49ACE1" text="In stock" />
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
});
