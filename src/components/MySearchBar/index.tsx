import React from 'react';
import {View, TextInput, ViewStyle, StyleSheet} from 'react-native';

import {SearchIcon} from '../../assets';
import {GapView} from '..';
import {useTheme} from '@react-navigation/native';

export default function MySearchBar({
  style,
  placeholder,
}: {
  style?: ViewStyle;
  placeholder?: string;
}) {
  const {colors} = useTheme();
  return (
    <View style={{...styles.searchBarContainer, ...style}}>
      <SearchIcon color={colors.text} />
      <GapView mode="horizontal" />
      <TextInput
        placeholderTextColor={colors.text}
        placeholder={placeholder ? placeholder : 'Search'}
        style={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    paddingVertical: 5,
    color: '#666',
  },
});
