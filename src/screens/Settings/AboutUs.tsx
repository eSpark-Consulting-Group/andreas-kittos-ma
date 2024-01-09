import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Tick} from '../../assets';
import {MyText} from '../../components';
import {MyTheme} from '../../types';

export default function AboutUs() {
  const theme = useTheme() as MyTheme;

  return <View></View>;
}

const styles = ({theme}: {theme?: MyTheme}) => StyleSheet.create({});
