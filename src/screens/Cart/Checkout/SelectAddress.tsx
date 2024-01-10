import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {MyTheme} from '../../../types';
import {MyText, MyView} from '../../../components';

export default function SelectAddress() {
  const {colors} = useTheme() as MyTheme;
  return (
    <MyView>
      <View
        style={{
          padding: 20,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
        }}>
        <MyText text="Street Name:" />
        <MyText text="City:" />
        <MyText text="State/ Province:" />
        <MyText text="Country:" />
        <MyText text="Zip-code:" />
      </View>
    </MyView>
  );
}
