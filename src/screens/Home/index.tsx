import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  GapView,
  MyBanner,
  MyCatalog,
  MyText,
  OverlayLoader,
} from '../../components';
import {HomeBanner_1, HomeBanner_2, HomeBanner_3} from '../../assets';
import {RootStackParamsList} from '../../types/navigationParams';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {catalogItemProps, categoryProps} from '../../types';
import {handleGetCategories, handleGetProducts} from '../Category/utils';
import {setCategories} from '../../features/category/categorySlice';
import {getWishlistIds, toggleFavourite} from '../../utils';
import {setFavorites} from '../../features/product/productSlice';

type HomeViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

export default function Home() {
  const timerRef = useRef<NodeJS.Timeout>();

  const [wishList, setWishList] = useState<
    {
      id: string;
      productId: catalogItemProps;
    }[]
  >([]);
  const [home, setHome] = useState<
    {
      catalogId: string;
      catalogName: string;
      catalogItems: {id: string; product: catalogItemProps}[];
    }[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<HomeViewNavigationProps['navigation']>();
  const dispatch = useDispatch();
  const categoriesData: categoryProps[] = useSelector(
    (store: any) => store.category.categories,
  );
  const Wishlist: string[] = useSelector(
    (store: any) => store.product.favorites,
  );
  const sortedHome = home
    .slice() // Create a shallow copy of the array to avoid modifying the original array
    .sort((a, b) => a?.catalogName?.localeCompare(b.catalogName))
    .map(({catalogId, catalogName, catalogItems}) => ({
      catalogId,
      catalogName,
      catalogItems,
    }));

  const finalCatItems = sortedHome.map(catalog => {
    const updatedCatalogItems = catalog.catalogItems.map(catalogItem => {
      const matchingProduct = wishList.find(
        product => product.productId.id === catalogItem.product.id,
      );

      if (matchingProduct) {
        // If a match is found, add the 'fav' property
        catalogItem.product.fav = true;
      } else {
        // If no match is found, add the 'fav' property as false
        catalogItem.product.fav = false;
      }

      return catalogItem;
    });

    // Update the catalog items array with the updated items
    return {...catalog, catalogItems: updatedCatalogItems};
  });

  const getHomeData = async () => {
    const data = [];
    const productData: {
      catalogId: string;
      catalogName: string;
      catalogItems: {id: string; product: catalogItemProps}[];
    }[] = [];
    let count = 0;
    const items = categoriesData?.map(async item => {
      const res: {status: boolean; data?: any} = await handleGetProducts(
        item.id,
      );
      count++;
      console.log('resitems', res);

      if (res.data?.items) {
        productData.push({
          catalogId: item.id,
          catalogName: item.name,
          catalogItems: res.data?.items[0]?.categoryProduct ?? [],
        });
      }
      if (count == categoriesData.length) {
        setLoading(false);
        setHome(productData);
        // console.log('🚀 ~ items ~ productData:', JSON.stringify(productData));
      }
    });
  };

  const getCategoriesData = async () => {
    const res: {status: boolean; data?: []} = await handleGetCategories();
    if (res?.data) {
      dispatch(setCategories(res?.data));
    }
  };

  useEffect(() => {
    if (categoriesData?.length > 0) {
      setLoading(true);
      getHomeData();
    }
  }, [categoriesData]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCategoriesData();
    getHomeData();
    setRefreshing(false);
  }, []);

  const getBanner = (name: string) => {
    switch (name?.toLowerCase()) {
      case 'laundry':
        return {
          bannerTitle1: 'Convenience at Your Doorstep!',
          bannerTitle2: 'Laundry Delivery Services',
          bannerBackground: HomeBanner_1,
        };

      case 'ironing':
        return {
          bannerTitle1: 'Fresh, Clean and Delivered!',
          bannerTitle2: 'Laundry Delivery Services',
          bannerBackground: HomeBanner_2,
        };

      case 'dry cleaning':
        return {
          bannerTitle1: 'Convenience at Your Doorstep!',
          bannerTitle2: 'Laundry Delivery Services',
          bannerBackground: HomeBanner_3,
        };

      default:
        return {
          bannerTitle1: 'Professional and Excellent!',
          bannerTitle2: 'Laundry Delivery Services',
          bannerBackground: HomeBanner_2,
        };
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

  return (
    <View style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <FlatList
        data={finalCatItems}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<GapView length={15} />}
        ListFooterComponent={<GapView length={2} />}
        ItemSeparatorComponent={() => <GapView length={20} />}
        renderItem={({item}) => {
          return (
            <>
              <View style={{paddingHorizontal: 20}}>
                <MyBanner
                  background={getBanner(item?.catalogName)?.bannerBackground}
                  title1={getBanner(item?.catalogName)?.bannerTitle1 as string}
                  title2={getBanner(item?.catalogName)?.bannerTitle2}
                />
              </View>
              <GapView length={20} />
              <MyCatalog
                catalogName={item?.catalogName}
                catalogItems={item?.catalogItems}
                onSeeAllPress={() =>
                  navigation.navigate('D1Nav', {
                    screen: 'CategoryView',
                    params: {
                      categoryId: item.catalogId,
                      categoryName: item?.catalogName,
                    },
                  })
                }
                onFavPress={(id, add) => addOrRemoveFavourite(id, add)}
                favorites={Wishlist}
              />
            </>
          );
        }}
      />
    </View>
  );
}
