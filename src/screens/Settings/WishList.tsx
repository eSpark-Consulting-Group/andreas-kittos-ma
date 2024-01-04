import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyText, MyView} from '../../components';

export default function WishList() {
  const theme = useTheme();

  return (
    <MyView topPad={0} hPad={0}>
      <View style={[styles.top, {borderColor: theme.colors.border}]}>
        <MyText text="4 items" textColor="#888888" size={14} />
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  top: {
    width: '100%',
    paddingLeft: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
});
