import React from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GapView, MyBanner} from '../../components';
import {CatBanner_1, CatBanner_2, CatBanner_3} from '../../assets';
import {
  BottomTabParamsList,
  D1ParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type CategoryViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Category'
>;

export default function Category() {
  const navigation = useNavigation<CategoryViewNavigationProps['navigation']>();
  const categories = [
    {title: 'Laundry', background: CatBanner_1},
    {title: 'Ironing', background: CatBanner_2},
    {title: 'Dry Cleaning', background: CatBanner_3},
  ];

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
