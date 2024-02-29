import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyBanner, MyCatalog, OverlayLoader} from '../../components';
import {HomeBanner_1, HomeBanner_2, HomeBanner_3} from '../../assets';
import {dryCleanCatalog, ironingCatalog, laundryCatalog} from '../../constants';
import {RootStackParamsList} from '../../types/navigationParams';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {catalogItemProps, categoryProps} from '../../types';
import {handleGetProducts} from '../Category/utils';
import {addToFavourite} from '../Settings/utils';

type HomeViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

export default function Home() {
  const [home, setHome] = useState<
    {
      catalogId: string;
      catalogName: string;
      catalogItems: {id: string; product: catalogItemProps}[];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<HomeViewNavigationProps['navigation']>();
  const categoriesData: categoryProps[] = useSelector(
    (store: any) => store.category.categories,
  );

  const getHomeData = async () => {
    const data = [];
    const productData: {
      catalogId: string;
      catalogName: string;
      catalogItems: {id: string; product: catalogItemProps}[];
    }[] = [];
    let count = 0;
    const items = categoriesData.map(async item => {
      const res: {status: boolean; data?: any} = await handleGetProducts(
        item.id,
      );
      count++;
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
      }
    });
  };

  useEffect(() => {
    if (categoriesData?.length > 0) {
      setLoading(true);
      getHomeData();
    }
  }, [categoriesData]);

  const getBanner = (name: string) => {
    switch (name.toLowerCase()) {
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
        break;
    }
  };

  const addFavourite = async (id: string) => {
    const res: {status: boolean; data?: []} = await addToFavourite(id);
    console.log('res', res.data);

    // if (res.status) {
    //   getFavouriteData();
    // }
  };

  return (
    <View style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <FlatList
        data={home}
        ListHeaderComponent={<GapView length={15} />}
        ListFooterComponent={<GapView length={2} />}
        ItemSeparatorComponent={() => <GapView length={20} />}
        renderItem={({item}) => {
          console.log('item', item);

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
                onFavPress={id => addFavourite(id)}
              />
            </>
          );
        }}
      />
    </View>
  );
}
