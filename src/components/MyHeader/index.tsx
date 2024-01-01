import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MyText from '../MyText';
import {BackArrow, Close, Dots, DrawMenu, HLogo} from '../../assets';
import {BubbleIcon} from '..';
import {useTheme} from '@react-navigation/native';

interface HeaderProps {
  lefticon: string | 'menu';
  label?: string;
  center?: 'searchBar' | 'logo';
  right?: React.ReactNode | string;
  bottomBorder?: boolean;
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
  lefticon = 'menu',
  label,
  center,
  right,
  bottomBorder = true,
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
        <BubbleIcon>{renderLeftIcon(lefticon)}</BubbleIcon>
        {label && (
          <MyText style={{marginLeft: 20}} size={16} weight="400">
            {label}
          </MyText>
        )}
      </View>
      {center && center == 'logo' ? <HLogo /> : <View />}
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
