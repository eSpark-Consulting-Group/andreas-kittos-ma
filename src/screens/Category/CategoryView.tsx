import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RangeSlider from 'rn-range-slider';
import FastImage from 'react-native-fast-image';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {
  BSheetModal,
  BubbleIcon,
  FAB,
  GapView,
  MyText,
  OverlayLoader,
} from '../../components';
import {CartIcon, Filter, Heart, HeartFill, Leaves} from '../../assets';
import {WINDOW_HEIGHT} from '../../constants';
import {MyTheme, catalogItemProps} from '../../types';
import {handleGetProducts} from './utils';
import {BottomTabParamsList, D1ParamsList} from '../../types/navigationParams';
import {
  getWishlistIds,
  handlefilterProducts,
  toggleFavourite,
} from '../../utils';
import {setFavorites} from '../../features/product/productSlice';
import {setSearchCatItems} from '../../features/search/searchSlice';

type CategoryViewNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList,
  'CategoryView'
>;

function CategoryView() {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const Wishlist = useSelector((store: any) => store.product.favorites);
  const searchText = useSelector((store: any) => store.search.categorySearch);
  const searchItems = useSelector(
    (store: any) => store.search.categorySearchItems,
  );
  const cartItems: [] = useSelector((store: any) => store.cart.cartItems);
  const navigation = useNavigation<CategoryViewNavigationProps['navigation']>();
  const route = useRoute<CategoryViewNavigationProps['route']>();
  const timerRef = useRef<NodeJS.Timeout>();

  const [visible, setVisible] = useState(false);
  const [priceDrop, setPriceDrop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<
    {id: string; product: catalogItemProps}[]
  >([]);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(500);
  const lowRef = useRef(0);
  const highRef = useRef(500);

  useEffect(() => {
    console.log(Boolean(searchText), Boolean(searchItems));
    filterSearchData();
  }, [searchText]);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const getProducts = async () => {
    setLoading(true);
    const res: {status: boolean; data?: any} = await handleGetProducts(
      route?.params?.categoryId,
    );
    if (res.status) {
      setCategoryProducts(res.data?.items[0]?.categoryProduct);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const addOrRemoveFavourite = async (id: string, add: boolean) => {
    clearTimeout(timerRef.current);
    let favItems = [...Wishlist];
    if (!add) {
      favItems.push(id);
    } else {
      favItems = favItems.filter(fav => fav !== id);
    }
    dispatch(setFavorites(favItems));
    const res: {status: boolean; data?: []} = await toggleFavourite(id);
    if (res.status) {
      timerRef.current = setTimeout(async () => {
        dispatch(setFavorites(await getWishlistIds()));
      }, 3000);
    }
  };

  const handleValueChange = useCallback((low: number, high: number) => {
    lowRef.current = low;
    highRef.current = high;
  }, []);

  const filterSearchData = async () => {
    setLoading(true);
    const filerData = await handlefilterProducts(
      route?.params?.categoryId,
      searchText,
      low,
      high,
    );
    dispatch(setSearchCatItems(filerData.data));
    console.log('🚀 ~ filterSearchData ~ filerData.data:', filerData.data);
    if (filerData?.data) {
      setCategoryProducts(filerData?.data[0]?.categoryProduct! as any);
    }
    setLoading(false);
  };

  return (
    <View style={{paddingHorizontal: 20, flex: 1}}>
      <OverlayLoader isShow={loading} />
      <FAB
        quantity={cartItems?.length}
        onPress={() => navigation.navigate('Cart')}
      />
      <BSheetModal
        theme={theme as MyTheme}
        visible={visible}
        onClose={val => {
          setVisible(val);
          filterSearchData();
        }}
        defaultHeight={WINDOW_HEIGHT * 0.3}>
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
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <MyText
                  text={'€' + Number(lowRef.current).toFixed(2)}
                  size={16}
                  textColor={theme.colors.textSec}
                />
                <MyText
                  text={'€' + Number(highRef.current).toFixed(2)}
                  size={16}
                  textColor={theme.colors.textSec}
                />
              </View>
              <GapView length={15} />
              <RangeSlider
                min={0}
                max={500}
                step={10}
                style={{width: '100%'}}
                low={lowRef.current}
                high={highRef.current}
                minRange={1}
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
                onTouchEnd={() => {
                  setLow(lowRef.current);
                  setHigh(highRef.current);
                }}
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
        </View>
      </BSheetModal>
      <FlatList
        data={categoryProducts}
        numColumns={2}
        ItemSeparatorComponent={() => <GapView length={10} />}
        style={{flex: 1}}
        renderItem={({item, index}) => (
          <CategoryViewItem
            item={item?.product}
            index={index}
            theme={theme}
            categoryId={route?.params?.categoryId}
            categoryName={route?.params?.categoryName}
            navigation={navigation}
            favorites={Wishlist}
            onFavPress={(id, add) => addOrRemoveFavourite(id, add)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? null : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}>
              <Leaves />
              <GapView />
              <MyText text="No products to display" />
            </View>
          )
        }
        ListHeaderComponent={
          <>
            <GapView length={15} />
            <View style={styles.categoryViewHeader}>
              <MyText
                size={18}
                textColor={theme.colors.text}
                text={route?.params?.categoryName}
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
        ListFooterComponent={<GapView />}
      />
    </View>
  );
}

const CategoryViewItem = ({
  item,
  index,
  theme,
  navigation,
  favorites,
  onFavPress,
  categoryId,
  categoryName,
}: {
  item: catalogItemProps;
  index: number;
  theme: MyTheme;
  categoryId?: string;
  categoryName?: string;
  navigation: CategoryViewNavigationProps['navigation'];
  favorites: string[];
  onFavPress: (id: string, add: boolean) => void;
}) => {
  const isEven = (num: number) => {
    return num % 2 === 0;
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductView', {
          categoryName,
          categoryId,
          produtInfo: item,
        })
      }
      key={item?.id}
      style={[
        styles.categoryViewItemContainer,
        {marginRight: isEven(index) ? '4%' : 0},
      ]}>
      <GapView />
      <BubbleIcon
        size={30}
        style={styles.wislistIcon}
        onPress={() =>
          onFavPress(
            item?.id as string,
            favorites?.some(fav => fav == item.id),
          )
        }
        children={
          favorites?.some(fav => fav == item.id) ? (
            <HeartFill />
          ) : (
            <Heart color={theme.colors.placeholder} />
          )
        }
      />
      <FastImage
        source={{uri: item?.productImage as string}}
        style={{width: 100, height: 100}}
      />
      <GapView length={15} />
      <View style={styles.detailsContainer}>
        <MyText
          numberOfLines={2}
          size={12}
          textColor={theme.colors.text}
          text={item?.name}
          style={{height: 35}}
        />
        <GapView length={5} />
        <View style={styles.priceContainer}>
          <MyText
            size={12}
            weight="600"
            textColor={theme.colors.text}
            text={'€' + Number(item?.price).toFixed(2)}
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

export default CategoryView;

const styles = StyleSheet.create({
  dropDownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  categoriesButton: {paddingLeft: 10, paddingVertical: 12, borderRadius: 2},
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
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E4E4E4',
  },
  wislistIcon: {position: 'absolute', zIndex: 1, right: 5, top: 5},
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
