import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyBanner, MyText, OverlayLoader} from '../../components';
import {CatBanner_1, CatBanner_2, CatBanner_3, Leaves} from '../../assets';
import {RootStackParamsList} from '../../types/navigationParams';
import {generalCatelogSort, handleGetCategories} from './utils';
import {categoryProps} from '../../types';

type CategoryViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

export default function Category() {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<CategoryViewNavigationProps['navigation']>();
  const images = [CatBanner_1, CatBanner_2, CatBanner_3];
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCategories();
    setRefreshing(false);
  }, []);

  const getCategories = async () => {
    setLoading(true);
    const res: {status: boolean; data?: []} = await handleGetCategories();
    if (res?.data) {
      setLoading(false);
      setCategories(res?.data);
    } else {
      setLoading(false);
    }
  };

  const getRandomImage = () => {
    // Generate a random index within the range of the images array
    const randomIndex = Math.floor(Math.random() * images.length);
    // Return the image at the randomly generated index
    return images[randomIndex];
  };

  const getImage = (name: string) => {
    switch (name?.toLowerCase()) {
      case 'laundry':
        return CatBanner_1;
      case 'ironing':
        return CatBanner_2;
      case 'dry cleaning':
        return CatBanner_3;
      default:
        break;
    }
  };

  console.log('kia xxx', categories);

  return (
    <View style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <FlatList
        data={categories?.sort(generalCatelogSort)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1, paddingVertical: 15}}
        style={{paddingHorizontal: 20}}
        ItemSeparatorComponent={() => <GapView length={40} />}
        renderItem={({item}) => (
          <MyBanner
            title1={item?.name}
            background={getRandomImage()}
            touchable
            onPress={() =>
              navigation.navigate('D1Nav', {
                screen: 'CategoryView',
                params: {categoryName: item?.name, categoryId: item?.id},
              })
            }
          />
        )}
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
              <MyText text="No categories to display" />
            </View>
          )
        }
      />
    </View>
  );
}
