import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MyText from '../MyText';
import {BackArrow, Close, Dots, DrawMenu, HLogo} from '../../assets';

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
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: bottomBorder ? 1 : 0,
        borderColor: '#E4E4E4',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 40,
            elevation: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          {renderLeftIcon(lefticon)}
        </View>
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

const styles = StyleSheet.create({});
