import React from 'react';
import {View} from 'react-native';
import {GapView, MyText} from '../../components';
import {Leaves} from '../../assets';

export default function Search() {
  const theme = useTheme() as MyTheme;
  return (
    <View style={{flex: 1}}>
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
