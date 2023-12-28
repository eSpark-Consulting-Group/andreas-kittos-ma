import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function BubbleIcon({
  size = 30,
  children,
}: {
  size: number;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#fff',
        width: size,
        height: size,
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
