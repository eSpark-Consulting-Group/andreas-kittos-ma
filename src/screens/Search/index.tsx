import {View, Text, Image} from 'react-native';
import React from 'react';
import {GapView, MyHeader, MyText} from '../../components';
import {Leaves, Scan} from '../../assets';

export default function Search() {
  return (
    <View style={{flex: 1}}>
      <MyHeader
        center="searchBar"
        right={<Scan />}
        searchBarStyle={{marginRight: 15}}
        bottomBorder={false}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Leaves />
        <GapView length={20} />
        <MyText
          text="You haven’t searched for items yet. Let’s start now - we’ll help you."
          style={{textAlign: 'center'}}
        />
      </View>
    </View>
  );
}
