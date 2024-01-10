import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {MyText} from '..';

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
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={styles.dropDown}>
        <MyText weight="500" text={title} />
        <EntypoIcon
          name={open ? 'chevron-thin-up' : 'chevron-thin-down'}
          size={14}
          color={'black'}
          style={{padding: 10}}
        />
      </TouchableOpacity>
      <View style={{display: open ? 'flex' : 'none'}}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});
