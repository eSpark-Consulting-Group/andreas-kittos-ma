import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

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
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        elevation: plain ? 0 : 2,
        borderColor: theme.colors.border,
        borderWidth: plain ? (!theme.dark ? 1 : 0) : 0,
        backgroundColor: theme.dark
          ? theme.colors.card
          : theme.colors.background,
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
