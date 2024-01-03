import React from 'react';
import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MyText from '../MyText';
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

interface HeaderProps {
  lefticon?: string | 'menu';
  label?: string;
  center?: 'searchBar' | 'logo';
  right?: React.ReactNode | string;
  bottomBorder?: boolean;
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
  searchBarStyle,
}: HeaderProps) => {
  return (
    <View
      style={{...styles.container, borderBottomWidth: bottomBorder ? 1 : 0}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {lefticon && <BubbleIcon>{renderLeftIcon(lefticon)}</BubbleIcon>}
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
    borderColor: '#E4E4E4',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
});
