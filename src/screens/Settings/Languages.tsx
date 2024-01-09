import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Tick} from '../../assets';
import {MyText} from '../../components';
import {MyTheme} from '../../types';

export default function Languages() {
  const theme = useTheme() as MyTheme;
  const [selected, setSelected] = useState('GB');

  const countries = [
    {name: 'United Kingdom', code: 'GB', language: 'English'},
    {name: 'Greece', code: 'GR', language: 'Greek'},
    {name: 'India', code: 'IN', language: 'Hindi'},
    {name: 'Pakistan', code: 'PK', language: 'Urdu'},
    {name: 'Spain', code: 'ES', language: 'Spanish'},
    {name: 'United Arab Emirates', code: 'AE', language: 'Arabic'},
    {name: 'China', code: 'CN', language: 'Chinese'},
    {name: 'Russian Federation', code: 'RU', language: 'Russian'},
    {name: 'Indonesia', code: 'ID', language: 'Indonesian'},
    {name: 'Japan', code: 'JP', language: 'Japanese'},
    {name: 'Sri Lanka', code: 'LK', language: 'Sinhala'},
    {name: 'Germany', code: 'GE', language: 'German'},
    {name: 'Turkey', code: 'TR', language: 'Turkish'},
  ];

  const renderLanguageItem = ({
    item,
  }: {
    item: {name: string; code: string; language: string};
  }) => (
    <Pressable
      style={styles({theme}).bar}
      onPress={() => setSelected(item.code)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: `https://flagsapi.com/${item.code}/flat/64.png`}}
          style={styles({}).flag}
        />
        <MyText size={16}>{item.language}</MyText>
      </View>
      {item.code == selected ? <Tick /> : <View />}
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={countries}
        keyExtractor={item => item.code}
        renderItem={({item}) => renderLanguageItem({item})}
      />
    </View>
  );
}

const styles = ({theme}: {theme?: MyTheme}) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 60,
      borderBottomColor: theme?.colors.border,
      borderBottomWidth: 1,
      paddingHorizontal: 15,
      justifyContent: 'space-between',
    },
    flag: {width: 40, height: 28.57, borderRadius: 10, marginRight: 20},
  });
