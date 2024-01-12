import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BSheetModal, BubbleIcon, GapView, MyText} from '../../components';
import {CartIcon, Filter, Heart} from '../../assets';
import {laundryCatalog} from '../../constants';
import {catalogItemProps} from '../../types';

function CategoryView() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={{paddingHorizontal: 20, flex: 1}}>
      <BSheetModal
        theme={theme}
        visible={visible}
        onClose={val => setVisible(val)}>
        <View style={{marginTop: 20}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <MyText text="By Price" size={16} />
              <AntDesign
                name="minus"
                size={26}
                color={theme.colors.text + 'aa'}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <MyText text="€ 10.00" size={16} style={{opacity: 0.6}} />
            </View>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <MyText text="By Category" size={16} />
              <AntDesign
                name="minus"
                size={26}
                color={theme.colors.text + 'aa'}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <View
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary + '28',
                }}>
                <MyText
                  text="Laundry"
                  weight="500"
                  textColor={theme.colors.primary}
                />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderRadius: 2,
                  marginVertical: 15,
                  backgroundColor: '#f1f1f1',
                }}>
                <MyText text="Ironing" style={{opacity: 0.6}} />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderRadius: 2,
                  backgroundColor: '#f1f1f1',
                }}>
                <MyText text="Dry Cleaning" style={{opacity: 0.6}} />
              </View>
            </View>
          </View>
        </View>
      </BSheetModal>
      <FlatList
        data={laundryCatalog}
        numColumns={2}
        ItemSeparatorComponent={() => <GapView length={10} />}
        style={{flex: 1}}
        renderItem={CategoryViewItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <GapView length={15} />
            <View style={styles.categoryViewHeader}>
              <MyText size={18} textColor={'#424242'} text={'Laundry'} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.filterButton}
                onPress={() => setVisible(true)}>
                <Filter />
              </TouchableOpacity>
            </View>
            <GapView />
          </>
        }
      />
    </View>
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

export default CategoryView;

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
