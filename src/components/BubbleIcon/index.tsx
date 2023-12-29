import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

export default function BubbleIcon({
  size = 30,
  children,
  style,
  plain,
}: {
  size?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  plain?: boolean;
}) {
  return (
    <View
      style={{
        ...styles.container,
        elevation: plain ? 0 : 2,
        borderColor: '#E4E4E4',
        borderWidth: plain ? 1 : 0,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
