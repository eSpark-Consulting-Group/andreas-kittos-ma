import React from 'react';
import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

import {
  BackArrow,
  Close,
  Dots,
  DrawMenu,
  HLogo,
  SearchIcon,
} from '../../assets';
import {BubbleIcon, GapView} from '..';
import MySearchBar from '../MySearchBar';
import MyText from '../MyText';

interface HeaderProps {
  lefticon?: string | 'menu';
  label?: string;
  center?: 'searchBar' | 'logo';
  right?: React.ReactNode | string;
  bottomBorder?: boolean;
  onPressLeft?: () => void;
  searchBarStyle?: ViewStyle;
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
  searchBarStyle,
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {lefticon && <BubbleIcon onPress={onPressLeft} >{renderLeftIcon(lefticon)}</BubbleIcon>}
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
          <MySearchBar style={searchBarStyle} />
        )
      ) : (
        <View />
      )}
      {right && right}
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
