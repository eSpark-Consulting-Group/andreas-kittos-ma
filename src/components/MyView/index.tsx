import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

function MyView({
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

export default memo(MyView);

const styles = StyleSheet.create({});
