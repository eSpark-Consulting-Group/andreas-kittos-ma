import React, {useMemo, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {BubbleIcon, GapView, MyText} from '../../components';
import {CartIcon, Filter, Heart} from '../../assets';
import {laundryCatalog} from '../../constants';
import {catalogItemProps} from '../../types';

export default function CategoryView() {
  return (
    <ScrollView style={{paddingHorizontal: 20, flex: 1}}>
      <GapView length={15} />
      <View style={styles.categoryViewHeader}>
        <MyText size={18} textColor={'#424242'} text={'Laundry'} />
        <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}>
          <Filter />
        </TouchableOpacity>
      </View>
      <GapView />
      <FlatList
        data={laundryCatalog}
        numColumns={2}
        ItemSeparatorComponent={() => <GapView length={10} />}
        style={{flex: 1}}
        renderItem={CategoryViewItem}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}

const CategoryViewItem = ({
  item,
  index,
}: {
  item: catalogItemProps;
  index: number;
}) => {
  const isEven = (num: number) => {
    return num % 2 === 0;
  };
  return (
    <>
      <View style={styles.categoryViewItemContainer}>
        <GapView />
        <BubbleIcon
          size={30}
          style={styles.whislistIcon}
          children={<Heart />}
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
      </View>
      {isEven(index) && <View style={{width: 15}} />}
    </>
  );
};

const styles = StyleSheet.create({
  categoryViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryViewItemContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
