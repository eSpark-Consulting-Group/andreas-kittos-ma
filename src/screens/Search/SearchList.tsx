import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage, {Source} from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native';
import RnRangeSlider from 'rn-range-slider';
import {useDispatch, useSelector} from 'react-redux';

import {BSheetModal, GapView, MyText, MyView} from '../../components';
import {AddToCart, Filter, Leaves} from '../../assets';
import {MyTheme, SearchDataProps, categoryProps} from '../../types';
import {WINDOW_HEIGHT} from '../../constants';
import {handlefilterProducts} from '../../utils';
import {setSearchItems} from '../../features/search/searchSlice';

export default function SearchList({
  searchListData,
}: {
  searchListData: SearchDataProps[];
}) {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const categories: categoryProps[] = useSelector(
    (store: any) => store.category.categories,
  );
  const searchedText: string = useSelector(
    (store: any) => store.search.searchedText,
  );
  console.log('saerchedText', searchedText);

  const [visible, setVisible] = useState(false);
  const [priceDrop, setPriceDrop] = useState(true);
  const [catDrop, setCatDrop] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  const handleValueChange = useCallback((low: number, high: number) => {
    setLow(low);
    setHigh(high);
  }, []);

  const filterSearchData = async () => {
    const filerData = await handlefilterProducts(
      low,
      high,
      selectedCat,
      searchedText,
    );
    dispatch(setSearchItems(filerData.data));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}>
      <MyView topPad={0} hPad={0} style={{flex: 1}}>
        <View style={[styles.top, {borderColor: theme.colors.border}]}>
          <MyText text="Results" textColor="#888888" size={14} />
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.head, {borderColor: theme.colors.border}]}>
            <Filter />
          </TouchableOpacity>
        </View>
        {searchListData.length > 0 ? (
          searchListData.map(item => {
            return item.categoryProduct.map((item1, index) => (
              <Item
                key={index}
                theme={theme as MyTheme}
                name={item1.product.name}
                price={item1.product.price}
                image={item1.product.productImage as string}
              />
            ));
          })
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Leaves />
            <GapView length={20} />
            <MyText text="No products found!" style={{textAlign: 'center'}} />
          </View>
        )}

        <BSheetModal
          theme={theme as MyTheme}
          visible={visible}
          onClose={val => {
            setVisible(val);
            console.log('closing', val);
            filterSearchData();
          }}
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
                style={styles.dropDownButton}>
                <MyText
                  text="By Price"
                  textColor={theme.colors.text}
                  size={16}
                />
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
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <MyText
                    text={'€' + Number(low).toFixed(2)}
                    size={16}
                    textColor={theme.colors.textSec}
                  />
                  <MyText
                    text={'€' + Number(high).toFixed(2)}
                    size={16}
                    textColor={theme.colors.textSec}
                  />
                </View>
                <GapView length={15} />
                <RnRangeSlider
                  min={0}
                  max={100}
                  step={10}
                  low={low}
                  high={high}
                  minRange={1}
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
                  onValueChanged={handleValueChange}
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
                style={styles.dropDownButton}>
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
                style={{
                  paddingVertical: 10,
                  display: catDrop ? 'flex' : 'none',
                }}>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    onPress={() => setSelectedCat(item.id as string)}
                    style={{
                      ...styles.categoriesButton,
                      borderWidth: selectedCat == item.id ? 1 : undefined,
                      marginVertical: index == 1 ? 15 : 0,
                      borderColor:
                        selectedCat == item.id
                          ? theme.colors.primary
                          : undefined,
                      backgroundColor:
                        selectedCat == item.id
                          ? theme.colors.primary + '28'
                          : theme.dark
                          ? theme.colors.card
                          : '#f1f1f1',
                    }}>
                    <MyText
                      text={item.name}
                      weight={selectedCat == item.id ? '500' : undefined}
                      textColor={
                        selectedCat == item.id
                          ? theme.colors.primary
                          : theme.colors.text
                      }
                      style={{opacity: selectedCat == item.id ? 1 : 0.6}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </BSheetModal>
      </MyView>
    </ScrollView>
  );
}

const Item = ({
  theme,
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
  theme: MyTheme;
}) => {
  return (
    <View style={[styles.content, {borderColor: theme.colors.border}]}>
      <FastImage
        source={{uri: image as string}}
        style={{width: 40, height: 56}}
        resizeMode="contain"
      />
      <View style={{width: '65%'}}>
        <MyText text={name} />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MyText
            text={'€' + Number(price).toFixed(2)}
            weight="700"
            size={16}
            style={{marginVertical: 10}}
          />
          <AddToCart />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
  },
  head: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    marginRight: 20,
  },
  dropDownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  categoriesButton: {paddingLeft: 10, paddingVertical: 12, borderRadius: 2},
});
