import React from 'react';
import {View} from 'react-native';
import {GapView, MyText} from '../../components';
import {Leaves} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme, SearchDataProps} from '../../types';
import SearchList from './SearchList';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function Search() {
  const theme = useTheme() as MyTheme;
  const searchItems: SearchDataProps[] = useSelector(
    (store: any) => store.search.searchItems,
  );
  const searchedText: string = useSelector(
    (store: any) => store.search.searchedText,
  );

  return (
    <View style={{flex: 1}}>
      {searchedText ? (
        <SearchList searchListData={searchItems} />
      ) : (
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
      )}
    </View>
  );
}
