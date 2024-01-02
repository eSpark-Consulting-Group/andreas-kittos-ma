import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {QRscanner} from '../../assets';
import {useTheme} from '@react-navigation/native';
import {MyTheme} from '../../types';

export default function Search() {
  const theme = useTheme() as MyTheme;
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Search</Text>
      <TouchableOpacity>
        <QRscanner />
      </TouchableOpacity>
    </View>
  );
}
