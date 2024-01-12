import React, {memo} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {BackArrow, Close, Dots, DrawMenu, HLogo} from '../../assets';
import BubbleIcon from '../BubbleIcon';
import MySearchBar from '../MySearchBar';
import MyText from '../MyText';

interface HeaderProps {
  lefticon?: string | 'menu';
  label?: string;
  center?: 'searchBar' | 'logo';
  right?: React.ReactNode | string;
  bottomBorder?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  searchBarStyle?: ViewStyle;
  searchBarLabel?: string;
  onBlur?: () => void;
}

const renderLeftIcon = (value: string) => {
  switch (value) {
    case 'menu':
      return <DrawMenu />;
    case 'dots':
      return <Dots />;
    case 'close':
      return <Close />;
    case 'back':
      return <BackArrow />;
    default:
      return <DrawMenu />;
  }
};

const MyHeader = ({
  lefticon,
  label,
  center,
  right,
  bottomBorder = true,
  onPressLeft,
  onPressRight,
  searchBarStyle,
  searchBarLabel,
  onBlur,
}: HeaderProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
        borderBottomWidth: bottomBorder ? 1 : 0,
      }}>
      <View style={styles.left}>
        {lefticon && (
          <BubbleIcon onPress={onPressLeft}>
            {renderLeftIcon(lefticon)}
          </BubbleIcon>
        )}
        {label && (
          <MyText style={{marginLeft: 20}} size={16} weight="400">
            {label}
          </MyText>
        )}
      </View>
      {center ? (
        center == 'logo' ? (
          <HLogo />
        ) : (
          <MySearchBar
            style={searchBarStyle}
            placeholder={searchBarLabel}
            onBlur={onBlur}
          />
        )
      ) : (
        <View />
      )}
      <Pressable onPress={onPressRight}>{right && right}</Pressable>
    </View>
  );
};

export default memo(MyHeader);

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {flexDirection: 'row', alignItems: 'center'},
});
