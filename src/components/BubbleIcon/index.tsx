import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

export default function BubbleIcon({
  size = 30,
  children,
  style,
}: {
  size?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#fff',
        width: size,
        height: size,
        ...style,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
