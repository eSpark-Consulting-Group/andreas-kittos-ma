import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {GapView, MyBanner, MyHeader} from '../../components';
import {CatBanner_1, CatBanner_2, CatBanner_3, SearchIcon} from '../../assets';

export default function Category() {
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
          />
        )}
      />
    </View>
  );
}
