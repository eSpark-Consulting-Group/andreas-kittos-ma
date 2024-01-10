import React, {memo} from 'react';
import {View, TextInput, ViewStyle, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {SearchIcon} from '../../assets';
import GapView from '../GapView';
import {MyTheme} from '../../types';

function MySearchBar({
  style,
  placeholder,
  onBlur,
}: {
  style?: ViewStyle;
  placeholder?: string;
  onBlur?: () => void;
}) {
  const {colors} = useTheme() as MyTheme;
  return (
    <View style={{...styles.searchBarContainer, ...style}}>
      <SearchIcon color={colors.text} />
      <GapView mode="horizontal" />
      <TextInput
        placeholderTextColor={colors.placeholder}
        placeholder={placeholder ? placeholder : 'Search'}
        style={styles.inputStyle}
        onBlur={onBlur}
      />
    </View>
  );
}

export default memo(MySearchBar);

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
