import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyBanner} from '../../components';
import {CatBanner_1, CatBanner_2, CatBanner_3} from '../../assets';
import {RootStackParamsList} from '../../types/navigationParams';
import {handleGetCategories} from './utils';

type CategoryViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

export default function Category() {
  const navigation = useNavigation<CategoryViewNavigationProps['navigation']>();
  const categories = [
    {title: 'Laundry', background: CatBanner_1},
    {title: 'Ironing', background: CatBanner_2},
    {title: 'Dry Cleaning', background: CatBanner_3},
  ];

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res: {status: boolean; data?: []} = await handleGetCategories();
    console.log('Category res', res.data);
  };

  return (
    <View>
      <FlatList
        data={categories}
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        ItemSeparatorComponent={() => <GapView length={40} />}
        renderItem={({item}) => (
          <MyBanner
            title1={item.title}
            background={item.background}
            touchable
            onPress={() =>
              navigation.navigate('D1Nav', {screen: 'CategoryView'})
            }
          />
        )}
      />
    </View>
  );
}
