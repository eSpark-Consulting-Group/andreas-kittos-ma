import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {GapView, MyBanner, MyHeader} from '../../components';
import BubbleIcon from '../../components/BubbleIcon';
import {CatBanner_1, CatBanner_2, CatBanner_3, SearchIcon} from '../../assets';

export default function Category() {
  const categories = [
    {title: 'Laundry', background: CatBanner_1},
    {title: 'Ironing', background: CatBanner_2},
    {title: 'Dry Cleaning', background: CatBanner_3},
  ];

  return (
    <View>
      <MyHeader
        center="logo"
        lefticon="menu"
        right={
          <BubbleIcon size={30} children={<SearchIcon color={'#49ACE1'} />} />
        }
      />
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
