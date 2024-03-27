import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {GapView, MyText} from '..';
import {useTheme} from '@react-navigation/native';

export default function MyDropDown({
  title,
  open,
  children,
  onPress,
}: {
  title: string;
  open: boolean;
  children: React.JSX.Element;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={{...styles.dropDown, backgroundColor: theme.colors.card}}>
        <MyText weight="500" text={title} />
        <EntypoIcon
          name={open ? 'chevron-thin-up' : 'chevron-thin-down'}
          size={14}
          color={theme.colors.text}
          style={{padding: 10}}
        />
      </TouchableOpacity>
      <GapView />
      <View style={{display: open ? 'flex' : 'none'}}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});
