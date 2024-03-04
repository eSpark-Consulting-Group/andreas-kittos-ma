import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RangeSlider from 'rn-range-slider';

import {
  BSheetModal,
  BubbleIcon,
  GapView,
  MyText,
  OverlayLoader,
} from '../../components';
import {CartIcon, Filter, Heart, HeartFill, Leaves} from '../../assets';
import {WINDOW_HEIGHT, laundryCatalog} from '../../constants';
import {MyTheme, catalogItemProps} from '../../types';
import {handleGetProducts} from './utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {D1ParamsList} from '../../types/navigationParams';
import {getWishlistIds, toggleFavourite} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites} from '../../features/product/productSlice';

type CategoryViewNavigationProps = NativeStackScreenProps<
  D1ParamsList,
  'CategoryView'
>;

function CategoryView() {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const Wishlist = useSelector((store: any) => store.product.favorites);
  const navigation = useNavigation<CategoryViewNavigationProps['navigation']>();
  const route = useRoute<CategoryViewNavigationProps['route']>();
  const [visible, setVisible] = useState(false);
  const [priceDrop, setPriceDrop] = useState(true);
  const [catDrop, setCatDrop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(0);
  const [categoryProducts, setCategoryProducts] = useState<
    {id: string; product: catalogItemProps}[]
  >([]);

  useEffect(() => {
    getProducts();
  }, []);

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

  const categories = [
    {title: 'Laundry'},
    {title: 'Ironing'},
    {title: 'Dry Cleaning'},
  ];

  console.log('Wishlist', Wishlist);

  const addOrRemoveFavourite = async (id: string, add: boolean) => {
    let favItems = [...Wishlist];
    if (!add) {
      favItems.push(id);
    } else {
      favItems = favItems.filter(fav => fav !== id);
    }
    dispatch(setFavorites(favItems));
    const res: {status: boolean; data?: []} = await toggleFavourite(id);
    if (res.status) {
      dispatch(setFavorites(await getWishlistIds()));
    }
  };

  return (
    <View style={{paddingHorizontal: 20, flex: 1}}>
      <OverlayLoader isShow={loading} />
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
              style={{paddingVertical: 10, display: catDrop ? 'flex' : 'none'}}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => setSelectedCat(index)}
                  style={{
                    ...styles.categoriesButton,
                    borderWidth: selectedCat == index ? 1 : undefined,
                    marginVertical: index == 1 ? 15 : 0,
                    borderColor:
                      selectedCat == index ? theme.colors.primary : undefined,
                    backgroundColor:
                      selectedCat == index
                        ? theme.colors.primary + '28'
                        : theme.dark
                        ? theme.colors.card
                        : '#f1f1f1',
                  }}>
                  <MyText
                    text={item.title}
                    weight={selectedCat == index ? '500' : undefined}
                    textColor={
                      selectedCat == index
                        ? theme.colors.primary
                        : theme.colors.text
                    }
                    style={{opacity: selectedCat == index ? 1 : 0.6}}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </BSheetModal>
      <FlatList
        data={categoryProducts}
        numColumns={2}
        ItemSeparatorComponent={() => <GapView length={10} />}
        style={{flex: 1}}
        contentContainerStyle={{flex: 0.9}}
        renderItem={({item, index}) => (
          <CategoryViewItem
            item={item?.product}
            index={index}
            theme={theme}
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
}: {
  item: catalogItemProps;
  index: number;
  theme: MyTheme;
  navigation: CategoryViewNavigationProps['navigation'];
  favorites: string[];
  onFavPress: (id: string, add: boolean) => void;
}) => {
  const isEven = (num: number) => {
    return num % 2 === 0;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductView', {produtInfo: item})}
      key={item.id}
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
      <Image
        source={{uri: item.productImage as string}}
        style={{width: 100, height: 100}}
      />
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
            text={'€' + item.price + '.00'}
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
