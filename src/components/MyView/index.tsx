import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

export default function MyView({
  topPad = 15,
  hPad = 20,
  botPad = 2,
  children,
  style,
}: {
  topPad?: number;
  hPad?: number;
  botPad?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={{
        paddingTop: topPad,
        paddingHorizontal: hPad,
        paddingBottom: botPad,
        ...style,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
