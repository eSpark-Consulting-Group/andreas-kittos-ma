import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RangeSlider from 'rn-range-slider';

import {BSheetModal, BubbleIcon, GapView, MyText} from '../../components';
import {CartIcon, Filter, Heart} from '../../assets';
import {WINDOW_HEIGHT, laundryCatalog} from '../../constants';
import {MyTheme, catalogItemProps} from '../../types';
import {handleGetProducts} from './utils';

function CategoryView() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [priceDrop, setPriceDrop] = useState(true);
  const [catDrop, setCatDrop] = useState(true);
  const [selectedCat, setSelectedCat] = useState(1);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res: {status: boolean; data?: []} = await handleGetProducts();
    console.log('Products res', res.data);
  };

  return (
    <View style={{paddingHorizontal: 20, flex: 1}}>
      <BSheetModal
        theme={theme as MyTheme}
        visible={visible}
        onClose={val => setVisible(val)}
        defaultHeight={WINDOW_HEIGHT * 0.55}>
        <View style={{marginTop: 20}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => setPriceDrop(!priceDrop)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <MyText text="By Price" textColor={theme.colors.text} size={16} />
              <AntDesign
                name={priceDrop ? 'minus' : 'plus'}
                size={26}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                display: priceDrop ? 'flex' : 'none',
              }}>
              <MyText
                text="€ 10.00"
                size={16}
                textColor={theme.colors.textSec}
              />
              <GapView length={15} />
              <RangeSlider
                min={0}
                max={100}
                step={1}
                style={{width: '100%'}}
                renderRailSelected={() => (
                  <View
                    style={{
                      height: 10,
                      borderRadius: 2,
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                )}
                renderRail={() => (
                  <View
                    style={{
                      flex: 1,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: '#C7D3EB',
                    }}
                  />
                )}
                onValueChanged={(low, high) =>
                  console.log('l:', low, 'h:', high)
                }
                renderThumb={() => (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 3,
                      borderRadius: 10,
                      backgroundColor: '#C7D3EB',
                      borderColor: theme.colors.primary,
                    }}
                  />
                )}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => setCatDrop(!catDrop)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <MyText
                text="By Category"
                textColor={theme.colors.text}
                size={16}
              />
              <AntDesign
                name={catDrop ? 'minus' : 'plus'}
                size={26}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <View
              style={{paddingVertical: 10, display: catDrop ? 'flex' : 'none'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setSelectedCat(1)}
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderRadius: 2,
                  borderWidth: selectedCat == 1 ? 1 : undefined,
                  borderColor:
                    selectedCat == 1 ? theme.colors.primary : undefined,
                  backgroundColor:
                    selectedCat == 1
                      ? theme.colors.primary + '28'
                      : theme.dark
                      ? theme.colors.card
                      : '#f1f1f1',
                }}>
                <MyText
                  text="Laundry"
                  weight={selectedCat == 1 ? '500' : undefined}
                  textColor={
                    selectedCat == 1 ? theme.colors.primary : theme.colors.text
                  }
                  style={{opacity: selectedCat == 1 ? 1 : 0.6}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setSelectedCat(2)}
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderRadius: 2,
                  marginVertical: 15,
                  borderWidth: selectedCat == 2 ? 1 : undefined,
                  borderColor:
                    selectedCat == 2 ? theme.colors.primary : undefined,
                  backgroundColor:
                    selectedCat == 1
                      ? theme.colors.primary + '28'
                      : theme.dark
                      ? theme.colors.card
                      : '#f1f1f1',
                }}>
                <MyText
                  weight={selectedCat == 2 ? '500' : undefined}
                  textColor={
                    selectedCat == 2 ? theme.colors.primary : theme.colors.text
                  }
                  text="Ironing"
                  style={{opacity: selectedCat == 2 ? 1 : 0.6}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setSelectedCat(3)}
                style={{
                  paddingLeft: 10,
                  paddingVertical: 12,
                  borderRadius: 2,
                  borderWidth: selectedCat == 3 ? 1 : undefined,
                  borderColor:
                    selectedCat == 3 ? theme.colors.primary : undefined,
                  backgroundColor:
                    selectedCat == 1
                      ? theme.colors.primary + '28'
                      : theme.dark
                      ? theme.colors.card
                      : '#f1f1f1',
                }}>
                <MyText
                  weight={selectedCat == 3 ? '500' : undefined}
                  textColor={
                    selectedCat == 3 ? theme.colors.primary : theme.colors.text
                  }
                  text="Dry Cleaning"
                  style={{opacity: selectedCat == 3 ? 1 : 0.6}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BSheetModal>
      <FlatList
        data={laundryCatalog}
        numColumns={2}
        ItemSeparatorComponent={() => <GapView length={10} />}
        style={{flex: 1}}
        renderItem={({item, index}) => CategoryViewItem({item, index, theme})}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <GapView length={15} />
            <View style={styles.categoryViewHeader}>
              <MyText
                size={18}
                textColor={theme.colors.text}
                text={'Laundry'}
              />
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
  theme,
}: {
  item: catalogItemProps;
  index: number;
  theme: MyTheme;
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
          children={<Heart color={theme.colors.placeholder} />}
        />
        <Image source={item.image} style={{width: 100, height: 100}} />
        <GapView length={15} />
        <View style={styles.detailsContainer}>
          <MyText
            numberOfLines={2}
            size={12}
            textColor={theme.colors.text}
            text={item.name}
            style={{height: 35}}
          />
          <GapView length={5} />
          <View style={styles.priceContainer}>
            <MyText
              size={12}
              weight="600"
              textColor={theme.colors.text}
              text={item.price}
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
