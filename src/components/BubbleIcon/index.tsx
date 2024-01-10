import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';

function BubbleIcon({
  size = 30,
  children,
  style,
  plain,
  onPress,
}: {
  size?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  plain?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
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
    </TouchableOpacity>
  );
}

export default memo(BubbleIcon);

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
