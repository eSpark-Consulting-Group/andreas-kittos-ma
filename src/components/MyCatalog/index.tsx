import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {BubbleIcon, GapView, MyText} from '..';
import {MyCatalogProps, catalogItemProps} from '../../types';
import {CartIcon, Heart} from '../../assets';

export default function MyCatalog({catalogName, catalogItems}: MyCatalogProps) {
  return (
    <View>
      <View style={styles.catalogHeader}>
        <MyText size={18} textColor={'#424242'} text={catalogName} />
        <MyText size={14} textColor={'#49ACE1'} text={'See All'} />
      </View>
      <GapView />
      <FlatList
        data={catalogItems}
        horizontal
        ItemSeparatorComponent={() => <GapView length={15} mode="horizontal" />}
        renderItem={catalogItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const catalogItem = ({
  item,
  index,
}: {
  item: catalogItemProps;
  index: number;
}) => {
  return (
    <View key={index} style={styles.catalogItemContainer}>
      <GapView />
      <BubbleIcon size={30} style={styles.whislistIcon} children={<Heart />} />
      <Image source={item.image} style={{width: 100, height: 100}} />
      <GapView length={15} />
      <View style={styles.detailsContainer}>
        <MyText
          numberOfLines={2}
          size={12}
          textColor="#424242"
          text={item.name}
          style={{height: 30}}
        />
        <GapView length={5} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
  );
};

const styles = StyleSheet.create({
  catalogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
